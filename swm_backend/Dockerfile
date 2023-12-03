# Use an official Python runtime as a parent image
FROM python:3.9.18-bullseye as backend

WORKDIR /python-docker

COPY ./requirements.txt .
RUN python -m pip install gurobipy

# Activate the license

RUN pip install -r requirements.txt

COPY . .

EXPOSE 5002

# CMD ["flask", "run" ,"-h" ,"localhost" ,"-p",  "5002"]
CMD ["python", "app.py"]
