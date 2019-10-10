import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)


#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/data.sqlite"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# Save references to each table
Bike_data = Base.classes.data

@app.route("/")
def index():
    return render_template("index.html")
    

@app.route("/coords")
def test():

    stmt = db.session.query(Bike_data).statement
    df = pd.read_sql_query(stmt, db.session.bind)

    coords = []
    counter = 0

    for row in range(165):
        
        coords.append([list(df.geo_point_2d)[counter][9:18], list(df.geo_point_2d)[counter][27:-2]])
        counter += 1

    return jsonify(coords)

if __name__ == "__main__":
    app.run(debug=True)
