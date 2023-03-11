import {injectable, /* inject, */ BindingScope} from '@loopback/core';

@injectable({scope: BindingScope.TRANSIENT})
export class ClevertabService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */
  async GetDetailCampaign(csrf: any, cookie: any, id: any, from: any, to: any){
    const request = require('request');
    const fs = require('fs');
    try {
      return await new Promise(function (resolve: any, reject: any) {
        const options = {
          method: 'POST',
          url: 'https://eu1.dashboard.clevertap.com/44K-948-K85Z/json/notification/calculateTrend.html?uc=1&requestTs=1666977536229',
          headers: {
            'authority': 'eu1.dashboard.clevertap.com',
            'accept': 'application/json, text/plain, */*',
            'accept-language': 'en-US,en;q=0.9,vi-VN;q=0.8,vi;q=0.7,fr-FR;q=0.6,fr;q=0.5',
            'content-type': 'application/x-www-form-urlencoded',
            'cookie': cookie,
            'origin': 'https://eu1.dashboard.clevertap.com',
            'referer': 'https://eu1.dashboard.clevertap.com/44K-948-K85Z/campaigns/campaign/1663745095/report/stats/trend',
            'sec-ch-ua': '"Chromium";v="106", "Google Chrome";v="106", "Not;A=Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
            'x-clevertap-csrf-token': csrf
          },
          form: {
            'id': id,
            'from': from,
            'to': to
          },
        };
        request(options, function (error: any, response: any) {
          if (error) reject(error);
          try {
            resolve(response);
          } catch (error_) {
            reject(error_);
          }
        });
      });
    } catch (error) {
      return null;
    }
  }

  async GetListCampaign(csrf: any, cookie: any){
    const request = require('request');
    const fs = require('fs');
    try {
      return await new Promise(function (resolve: any, reject: any) {
        const options = {
          method: 'GET',
          url: 'https://eu1.dashboard.clevertap.com/44K-948-K85Z/json/report/load?q=%7B%22stc%22%3A1%2C%22searchKeyword%22%3Anull%2C%22archive%22%3Afalse%2C%22prefiltered%22%3Anull%2C%22purpose%22%3A1%2C%22channel%22%3A%5B%5D%2C%22delivery%22%3A%5B%5D%2C%22campaign_type%22%3A%5B%5D%2C%22label%22%3A%5B%5D%2C%22created_by%22%3A%5B%5D%2C%22subChannel%22%3A%5B%5D%2C%22pageSize%22%3A1000%2C%22dateFrom%22%3A%2220221014%22%2C%22dateTo%22%3A%2220221113%22%7D&source=&uc=1&requestTs=1666978849181',
          headers: {
            'authority': 'eu1.dashboard.clevertap.com',
          'accept': 'application/json, text/plain, */*',
          'accept-language': 'en-US,en;q=0.9,vi-VN;q=0.8,vi;q=0.7,fr-FR;q=0.6,fr;q=0.5',
          'cookie': cookie,
          'referer': 'https://eu1.dashboard.clevertap.com/44K-948-K85Z/campaigns/',
          'sec-ch-ua': '"Chromium";v="106", "Google Chrome";v="106", "Not;A=Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
          'x-clevertap-csrf-token': csrf
          },
          form: {
            'id': '1663745095',
            'from': '20220928',
            'to': '20221028'
          },
        };
        request(options, function (error: any, response: any) {
          if (error) reject(error);
          try {
            resolve(response);
          } catch (error_) {
            reject(error_);
          }
        });
      });
    } catch (error) {
      return null;
    }
  }

  async GetListJourneys(csrf: any, cookie: any){
    const request = require('request');
    const fs = require('fs');
    try {
      return await new Promise(function (resolve: any, reject: any) {
        const options = {
          method: 'GET',
          url: 'https://eu1.dashboard.clevertap.com/44K-948-K85Z/json/targeting/journeys/load?q={"pageNumber":1,"prefiltered":null,"searchKeyword":null,"sortField":"updated_ts","sortOrder":-1,"stc":1,"dateFrom":"20230223","dateTo":"20230325","pageSize":80}&uc=1&requestTs=1678461166825',
          headers: {
            'authority': 'eu1.dashboard.clevertap.com',
          'accept': 'application/json, text/plain, */*',
          'accept-language': 'en-US,en;q=0.9,vi-VN;q=0.8,vi;q=0.7,fr-FR;q=0.6,fr;q=0.5',
          'cookie': cookie,
          'referer': 'https://eu1.dashboard.clevertap.com/44K-948-K85Z/journeys/',
          'sec-ch-ua': '"Chromium";v="106", "Google Chrome";v="106", "Not;A=Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
          'x-clevertap-csrf-token': csrf
          },
          form: {
            'id': '1663745095',
            'from': '20220928',
            'to': '20221028'
          },
        };
        request(options, function (error: any, response: any) {
          if (error) reject(error);
          try {
            resolve(response);
          } catch (error_) {
            reject(error_);
          }
        });
      });
    } catch (error) {
      return null;
    }
  }

  async GetIDJourneys(csrf: any, cookie: any, id: any, from: any, to: any){
    const request = require('request');
    const fs = require('fs');
    try {
      return await new Promise(function (resolve: any, reject: any) {
        const options = {
          method: 'POST',
          url: 'https://eu1.dashboard.clevertap.com/44K-948-K85Z/json/interact/journeys/stats?id='+id+'&from='+from+'&to='+to+'&uc=1&requestTs=1678502427598',
          headers: {
            'authority': 'eu1.dashboard.clevertap.com',
            'accept': 'application/json, text/plain, */*',
            'accept-language': 'en-US,en;q=0.9,vi-VN;q=0.8,vi;q=0.7,fr-FR;q=0.6,fr;q=0.5',
            'content-type': 'application/x-www-form-urlencoded',
            'cookie': cookie,
            'origin': 'https://eu1.dashboard.clevertap.com',
            'referer': 'https://eu1.dashboard.clevertap.com/44K-948-K85Z/journeys/journey/'+id+'/report/node-stats',
            'sec-ch-ua': '"Chromium";v="106", "Google Chrome";v="106", "Not;A=Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
            'x-clevertap-csrf-token': csrf
          },
          form: {
            "journeyId": id,
            "fromDate": from,
            "toDate": to
          },
        };
        request(options, function (error: any, response: any) {
          if (error) reject(error);
          try {
            resolve(response);
          } catch (error_) {
            reject(error_);
          }
        });
      });
    } catch (error) {
      return null;
    }
  }


  async GetNodeStats(csrf: any, cookie: any, id: any, from: any, to: any){
    const request = require('request');
    const fs = require('fs');
    try {
      return await new Promise(function (resolve: any, reject: any) {
        const options = {
          method: 'POST',
          url: 'https://eu1.dashboard.clevertap.com/44K-948-K85Z/json/notification/calculateTrend.html?uc=1&requestTs=1678446067519',
          headers: {
            'authority': 'eu1.dashboard.clevertap.com',
            'accept': 'application/json, text/plain, */*',
            'accept-language': 'en-US,en;q=0.9,vi-VN;q=0.8,vi;q=0.7,fr-FR;q=0.6,fr;q=0.5',
            'content-type': 'application/x-www-form-urlencoded',
            'cookie': cookie,
            'origin': 'https://eu1.dashboard.clevertap.com',
            'referer': 'https://eu1.dashboard.clevertap.com/44K-948-K85Z/campaigns/campaign/1663745095/report/stats/trend',
            'sec-ch-ua': '"Chromium";v="106", "Google Chrome";v="106", "Not;A=Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
            'x-clevertap-csrf-token': csrf
          },
          form: {
            "id": id,
            "from": from,
            "to": to
          },
        };
        request(options, function (error: any, response: any) {
          if (error) reject(error);
          try {
            resolve(response);
          } catch (error_) {
            reject(error_);
          }
        });
      });
    } catch (error) {
      return null;
    }
  }
}
