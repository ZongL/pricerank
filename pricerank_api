import requests
from bs4 import BeautifulSoup
#url = 'https://api-web.lixiang.com/vehicle-api/v1-0/products?productId=1664417698271'

seperatetag='---'

CarID_L7 = [1675329815245,1675329186219,1675327798085]
CarID_L8 = [1675326413038,1664417594641,1664417698271]
CarID_L9 = [1688715360214,1655653469366]
CarID_LMEGA = [100720144187769345]
CarID_Lixiang = CarID_L7+CarID_L8+CarID_L9+CarID_LMEGA


CarID_G = ['G3i460G%2BXP','G6_580_Pro','G6_580_Max','570TSa','570MAX']
CarID_P = ['500PLb2','500PRb2','550Pro','550Max']
CarID_X = ['HABRPRO']
CarID_xiaopeng = CarID_G + CarID_P + CarID_X

def readprice_Lixiang(CarID):
    #https://api-web.lixiang.com/vehicle-api/v1-0/products/product/all-on-sale ''' all on sale'''
    CarID=str(CarID)
    url = 'https://api-web.lixiang.com/vehicle-api/v1-0/products?productId='+CarID
    headers = {
        "X-Chj-Devicetype": "1",
        "Access-Control-Allow-Origin": "https://www.lixiang.com"
    }
    response = requests.get(url,headers=headers)
    if response.status_code == 200:
        CarData = response.json()
        if 'data' in CarData:
                print(CarData['data']['product']['productName'] + seperatetag + str(CarData['data']['product']['minPrice']/100))
                #print(CarData['data']['product']['minPrice'])
        else:
            print("没有找到data字段")
    else:
        print(f"请求失败，状态码：{response.status_code}")


def readprice_weilai():
    url='https://www.nio.cn/configurator/config_web/v1/in/configurator/price/get?model_code=EC6&generation_code=EC6007&platform=nio_pc&region=CN'
    headers = {}
    response = requests.get(url, headers=headers)
    print(response.json())

def readprice_xiaopeng(CarID):
    #url='https://store.xiaopeng.com/api/v1/client/orion/configurator/listCarInfoList?carVersionSn=G6_580_Pro'
    CarID = str(CarID)
    url='https://store.xiaopeng.com/api/v1/client/orion/configurator/listCarInfoList?carVersionSn='+CarID
    response = requests.get(url)
    if response.status_code == 200:
        CarData = response.json()
        if 'data' in CarData:
            #print(CarData['data'][1])
            print(CarData['data'][1]['carSeriesName']+ CarData['data'][1]['carVersionCode'] +seperatetag+ str(CarData['data'][1]['pricePackage']['salePrice']))

for cars in CarID_Lixiang:
    readprice_Lixiang(cars)

#readprice_weilai()

for cars in CarID_xiaopeng:
    readprice_xiaopeng(cars)
