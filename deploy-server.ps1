param(
    $acrName,
    $acrUsername,
    $acrPassword,
    $resourceGroup,
    $aciName,
    $imgName = "websocket-broadcast"
)

$registry = "$($acrName).azurecr.io"
$fullImgName = "$($registry)/$($imgName)"
docker build -t $fullImgName -f server.Dockerfile .
# docker run -e "WS_SERVER_PORT=8081" -p 8081:8081 $fullImgName

az acr login --name $acrName --username $acrUsername --password $acrPassword

$registry = "$($acrName).azurecr.io"
docker login $registry
docker push "$($fullImgName):latest"

az container create --resource-group $resourceGroup 
--name $aciName --image "$($fullImgName):latest" --restart-policy OnFailure --environment-variables 'WS_SERVER_PORT'='80' --dns-name-label "jjane-$($imgName)"