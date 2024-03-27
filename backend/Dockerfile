FROM python:3.10-alpine

COPY ./requirements.txt /code/

WORKDIR /code

RUN pip install -r requirements.txt

COPY ./ /code/