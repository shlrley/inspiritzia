from main import app
from main import request
from main import json
import sqlite3
import pandas as pd
from model.Product import Product
from mlxtend.frequent_patterns import apriori, association_rules

@app.route('/post', methods=['POST'])
def Recommender():
    data = json.loads(request.data)
    p = Product(data)
    product = json.loads(p.get())

    # Load data set
    con = sqlite3.connect("../user_products.db")
    sql_query = pd.read_sql_query("select * from user_products")
    df = pd.DataFrame(sql_query, columns = ['customer', 'product'])

    if product not in df['product']:
        print('Product has not yet been added.')
        return json.dumps(product)

    # Filter for users who have at least 10 items posted
    df = df.groupby('customer').filter(lambda x: (len(x)>10))

    # Format data for processing
    df = df.groupby(['customer', 'product']).size().unstack(fill_value=0).astype(bool)
    df = df.reset_index(0).reset_index(drop=True)

    # Drop customer
    df = df.drop(columns=['customer'])

    # Retrieve common items
    common_items = apriori(df, min_support=0.01, max_len=2, use_colnames=True, verbose=1)

    # Get association rules
    ap_rules = association_rules(common_items, metric='confidence', min_threshold=0.3)

    # Format data frame
    cols = ['antecedents','consequents']
    ap_rules[cols] = ap_rules[cols].astype('string')

    ap_rules['antecedents'] = ap_rules['antecedents'].str.removeprefix("frozenset({'")
    ap_rules['antecedents'] = ap_rules['antecedents'].str.removesuffix("'})")

    ap_rules['consequents'] = ap_rules['consequents'].str.removeprefix("frozenset({'")
    ap_rules['consequents'] = ap_rules['consequents'].str.removesuffix("'})")

    # Find recommended items
    recs = ap_rules.loc[ap_rules['antecedents'] == product]['consequents'].tolist()

    # Update the database
    cur = con.cursor()
    cur.execute("DROP TABLE association")
    print("Table dropped... ")

    # Create table
    cur.execute("CREATE TABLE association (item1, item2);") 

    to_db = []
    for index, row in recs.iterrows():
        to_db.append((row['antecedents'], row['consequents']))

    cur.executemany("INSERT INTO association (item1, item2) VALUES (?, ?);", to_db)
    con.commit()
    con.close()

    return recs