import pymongo

client = pymongo.MongoClient('localhost',27017);
db = client.stream_vid