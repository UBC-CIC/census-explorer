read curdir <<< $(pwd)
docker build --tag layer:latest .
#docker run --rm -v "C:\Users\dacost2\Desktop\census-explorer-backend\layers":/dest layer:latest cp code.zip /dest/lambda_layer.zip

docker run -v "C:\Users\dacost2\Desktop\census-explorer-backend\layers":/dest layer:latest cp code.zip ./lambda_layer.zip
#docker run -v "C:\Users\dacost2\Desktop\census-explorer-backend\layers":/dest layer:latest ls
