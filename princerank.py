import os
import requests
import json
import time

'''this script will read patents from USPTO then write result to 'tesla_patents_data.json', and compare with 'tesla_patents_data_ai.json', so you have to create a json file with this name, the content can get from PatentData.ts'''

mykimi_key = "replaceyourkey"


fetch_token =""

def get_all_patent_tesla(access_token_fetch):
    url = 'https://ppubs.uspto.gov/dirsearch-public/searches/generic'
    datas = '{"cursorMarker":"*","databaseFilters":[{"databaseName":"USPAT"},{"databaseName":"US-PGPUB"},{"databaseName":"USOCR"}],"fields":["documentId","patentNumber","title","datePublished","inventors","pageCount"],"op":"AND","pageSize":50,"q":"(Tesla).aanm. NOT (Biohealing).aanm.","searchType":0,"sort":"date_publ desc"}'
    headers = {
        'authority': 'ppubs.uspto.gov',
        'accept': 'application/json',
        'accept-language': 'en-US,en;q=0.9,zh;q=0.8,und;q=0.7,zh-CN;q=0.6',
        'content-type': 'application/json',
        #'cookie': '_ga_F4Q7EX1K95=GS1.1.1710767019.1.0.1710767019.0.0.0; _gid=GA1.2.1032127302.1710767020; _gat_SiteSpecificT=1; _gat_RollupT=1; _ga=GA1.3.1469008747.1710767020; _gid=GA1.3.1032127302.1710767020; _gat_GSA_ENOR0=1; _ga_CSLL4ZEK4L=GS1.1.1710767020.1.0.1710767020.0.0.0; _ga=GA1.1.1469008747.1710767020',
        #'origin': 'https://ppubs.uspto.gov',
        #'referer': 'https://ppubs.uspto.gov/pubwebapp/static/pages/ppubsbasic.html',
        #'sec-ch-ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
        #'sec-ch-ua-mobile': '?0',
        #'sec-ch-ua-platform': '"macOS"',
        #'sec-fetch-dest': 'empty',
        #'sec-fetch-mode': 'cors',
        #'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'x-access-token': access_token_fetch
    }
    response = requests.post(url,headers =headers,data=datas)
    if response.status_code == 200:
        #print(json.dumps(json.loads(response.text), indent=4))
        with open('tesla_patents_data.json', 'w', encoding='utf-8') as file:
            json.dump(json.loads(response.text), file, ensure_ascii=False, indent=4)
        return (json.loads(response.text))
    else:
        print("Failed to fetch patent data")
        return None

#get_all_patent_tesla()

def AI_all_patent_tesla(tesla_patent_title):
    prompt_to_kimi = "这是tesla一篇专利的标题" + tesla_patent_title + "，帮我分析一下里面可能的技术,请限制在100个字以内"
    url = 'https://api.moonshot.cn/v1/chat/completions'
    headers = {
        "Content-Type": "application/json",  # 根据API要求设置Content-Type
        "Authorization": "Bearer "+mykimi_key
    }
    datas = {
    "model": "moonshot-v1-8k",
    "messages": [
        {"role": "system", "content": "你是 Kimi，由 Moonshot AI 提供的人工智能助手"},
        {"role": "user", "content": prompt_to_kimi}
    ],
     "temperature": 0.3
    }
    response = requests.post(url, headers=headers, json=datas)
    print(response.status_code)
    if response.status_code == 200:
        PatentData = response.json()
        #print(PatentData['choices'][0]['message']['content'])
        return(PatentData['choices'][0]['message']['content'])
    else:
        return(response.status_code)

def get_x_access_token():
    # 定义请求的URL
    url = "https://ppubs.uspto.gov/dirsearch-public/users/me/session"
    # 定义请求头
    headers = {
        "authority": "ppubs.uspto.gov",
        "accept": "*/*",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0",
        # 注意：这里不要包含"x-access-token": "null"，除非这是必须的认证步骤
    }
    # 定义请求体（这里看起来像是用户ID）
    #data = "25334821"
    # 发送POST请求
    response = requests.post(url, headers=headers) #, data=data)
    # 检查响应头中是否有x-access-token
    x_access_token = response.headers.get('x-access-token')
    # 如果需要的话，这里也可以打印响应内容
    # print(json.dumps(response.json(), indent=4))
    # 打印响应头
    for key, value in response.headers.items():
        print(f"{key}: {value}")
        # 返回x-access-token，如果不存在则返回None
    return x_access_token

def read_patents_data(jsonfilename):
    with open(jsonfilename, 'r', encoding='utf-8') as file:
        return json.load(file)

def merge_json_file_by_docsnum(data_dump_old,data_dump_new,pagenum):
    if pagenum != 0 :
        for i in range(pagenum-1,-1,-1):
            data_dump_old['docs'].insert(0,data_dump_new['docs'][i])
        data_dump_old["numFound"] = data_dump_new["numFound"]
    return data_dump_old



if __name__ == "__main__":
    if os.path.exists('tesla_patents_data.json'):
        all_patent_data = read_patents_data('tesla_patents_data.json')
    else:
        #get token -> fetch data -> save data to tesla_patents_data.json
        fetch_token = get_x_access_token()
        get_all_patent_tesla(fetch_token)
        # get data from local file
        all_patent_data = read_patents_data('tesla_patents_data.json')
        print('-------------will create new patent json')

    #add all AI_Opinin to original data
    for doc in all_patent_data["docs"]:
        doc["AI_Opinion"] = 429
        if 'type' in doc:
            del doc['type']


    print(all_patent_data["numFound"])
    all_patent_data_old = read_patents_data('tesla_patents_data_ai.json')
    print(all_patent_data_old["numFound"])
    new_patent_number = all_patent_data["numFound"] - all_patent_data_old["numFound"]
    print("found new_patent_number :"+str(new_patent_number))

    print("merge json file")
    all_patent_merged = merge_json_file_by_docsnum(all_patent_data_old,all_patent_data,new_patent_number)

    for doc in all_patent_merged["docs"]:
        if doc["AI_Opinion"] == 429:
            prompt = doc["title"]
            # 调用AI函数处理prompt
            print(prompt)
            ai_response = AI_all_patent_tesla(prompt)
            #print(ai_response)
            while ai_response == 429:
                time.sleep(30)
                print(prompt)
                ai_response = AI_all_patent_tesla(prompt)
            doc["AI_Opinion"] = ai_response
            # 等待10秒

    with open('tesla_patents_data_ai.json', 'w', encoding='utf-8') as file:
        json.dump(all_patent_merged, file, ensure_ascii=False, indent=4)
