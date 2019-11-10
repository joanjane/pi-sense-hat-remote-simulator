param(
    $acrName,
    $acrUsername,
    $acrPassword,
    $resourceGroup,
    $aciName,
    $imgName = "websocket-broadcast",
    $tag = "latest"
)

$registry = "$($acrName).azurecr.io"
$fullImgName = "$($registry)/$($imgName):$($tag)"

docker build -t $fullImgName -f server.Dockerfile .
# docker run -p 8080:80 -p 4443:443 $fullImgName

az acr login --name $acrName --username $acrUsername --password $acrPassword

$registry = "$($acrName).azurecr.io"
docker login $registry
docker push $fullImgName

az container delete --name $aciName --resource-group $resourceGroup --yes
az container create --name $aciName --resource-group $resourceGroup --image $fullImgName --ports 80 443 --registry-login-server $registry --registry-username $acrUsername --registry-password $acrPassword --dns-name-label $aciName --environment-variables CNAME="$($aciName).westeurope.azurecontainer.io" --location westeurope