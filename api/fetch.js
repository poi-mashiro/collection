const loaclUrl = 'http://localhost:8080';
const onlineUrl = 'https://';
let baseUrl;
if (process.env.NODE_ENV === 'development') {
  baseUrl = loaclUrl;
} else if (process.env.NODE_ENV === 'production') {
  baseUrl = onlineUrl;
}

export default async (url = '', data = {}, type = 'GET', json = '', method = 'fetch') => {
  type = type.toUpperCase();
  url = baseUrl + url;

  if (type === 'GET') {
    let dataStr = ''; // 数据拼接字符串
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&';
    });

    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
      url = url + '?' + dataStr;
    }
  }

  if (window.fetch && method === 'fetch') {
    let requestConfig = {
      credentials: 'include',
      method: type,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      mode: 'no-cors',
      cache: 'default'
    };

    if (json === 'json') {
      requestConfig.headers['Content-Type'] = 'application/json';
    }

    if (type === 'POST') {
      let str = ''; // 数据拼接字符串
      Object.keys(data).forEach(key => {
        str += key + '=' + data[key] + '&';
      });
      Object.defineProperty(requestConfig, 'body', {
        value: str
      });
      if (json === 'json') {
        Object.defineProperty(requestConfig, 'body', {
          value: JSON.stringify(data)
        });
      }
    }

    try {
      const response = await fetch(url, requestConfig);
      console.log(response);
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      throw new Error(error);
    }
  } else {
    return new Promise((resolve, reject) => {
      let requestObj;
      if (window.XMLHttpRequest) {
        requestObj = new XMLHttpRequest();
      } else {
        requestObj = new ActiveXObject();
      }

      let sendData = '';
      if (type === 'POST') {
        Object.keys(data).forEach(key => {
          sendData += key + '=' + data[key] + '&';
        });
        if (json === 'json') {
          sendData = JSON.stringify(data);
        }
      }

      requestObj.open(type, url, true);
      requestObj.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      if (json === 'json') {
        requestObj.setRequestHeader('Content-type', 'application/json');
      }
      requestObj.send(sendData);

      requestObj.onreadystatechange = () => {
        if (requestObj.readyState === 4) {
          if (requestObj.status === 200) {
            let obj = requestObj.response;
            if (typeof obj !== 'object') {
              obj = JSON.parse(obj);
            }
            resolve(obj);
          } else {
            reject(requestObj);
          }
        }
      };
    });
  }
};
