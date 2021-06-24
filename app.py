# import dependencies
from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
import os
import numpy as np
import pandas as pd
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

# read in json...?