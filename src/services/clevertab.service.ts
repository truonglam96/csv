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
            'cookie': 'G_ENABLED_IDPS=google; wzrk_lcbid=844; _hjSessionUser_2030532=eyJpZCI6Ijc1OWZjMTEyLWQwZTAtNWYzOC1iZmEwLTBmZWNiMjJkMzcxNSIsImNyZWF0ZWQiOjE2NTQ2NjQxNDQ3MjQsImV4aXN0aW5nIjp0cnVlfQ==; JSESSIONID=node05b5pk1qeoowc1hzjm6hjkgfkk367570.node0; wzrk_lc=61509701719b47d1a6c892078f3b4c9816681870338441666977433thuc@wecheer.io; wzrk_flags=%7B%22test-app%22%3Afalse%2C%22campaigns2%22%3Atrue%2C%22journeys2%22%3Atrue%2C%22reminder%22%3Afalse%2C%22cascade%22%3Afalse%2C%22push-webhooks-kv-list%22%3Afalse%2C%22appsflyer-onelink-setup%22%3Afalse%2C%22segments-bulk-delete%22%3Afalse%2C%22vs-editor%22%3Afalse%2C%22isNewExportsUI%22%3Afalse%2C%22splitter%22%3Afalse%2C%22features-audit%22%3Afalse%2C%22enhanced_limit_cl%22%3Afalse%2C%22liquid-in-online-channels%22%3Afalse%2C%22multi-app%22%3Afalse%2C%22generic-whatsapp-provider%22%3Afalse%2C%22click-tracking%22%3Afalse%2C%22web-nativedisplay%22%3Afalse%2C%22sms-nexmoct-enabled%22%3Afalse%2C%22test-flagged-feature%22%3Afalse%2C%22amp-enabled%22%3Afalse%2C%22push-render-enhancement%22%3Afalse%2C%22one-hour-export%22%3Afalse%2C%22cr-enhancements%22%3Afalse%7D; WZRK_G=248cf46f479c45eb8356194b48a513a6; eventsListTs=; segmentListTs=1665389479689; _hjIncludedInSessionSample=1; _hjSession_2030532=eyJpZCI6IjBlYWUzYTYxLTdhYWUtNDBlMy05ZmRmLTc0Y2VlNGU4NjNjOCIsImNyZWF0ZWQiOjE2NjY5Nzc0NDEyMTUsImluU2FtcGxlIjp0cnVlfQ==; _hjIncludedInPageviewSample=1; _hjAbsoluteSessionInProgress=0; _hjCachedUserAttributes=eyJhdHRyaWJ1dGVzIjp7IkFjY291bnQgaWQiOiI0NEstOTQ4LUs4NVoiLCJSZWdpb24iOiJldTEiLCJpc1NlbGZTZXJ2ZUFjY291bnQiOmZhbHNlfSwidXNlcklkIjoidGh1Y0B3ZWNoZWVyLmlvIn0=; _hjUserAttributesHash=b958e432f19f53fab2c42337d4780e25; secret_csrf=c2969f48-53c9-47c4-ba23-5ebd0e099489; csrf=306336681; WSESSIONID=TYedQuhgFexB3BfAET6dP3GEQRESstF5kkXNlbtJlRj9nmF0zV2FmRuvVblm3j6xejmrZYF7BOFpy9hYjfukx132dHM5NroQXSv5pmmWdxumz239GV0AR7TNhdQo5CImI%9J3vnDcU; WZRK_S_R74-ZWR-R44Z=%7B%22p%22%3A3%2C%22s%22%3A1666977438%2C%22t%22%3A1666977535%7D; AWSALB=Z/u4ssKZI30ai1ITX2YsJ0ZumEcyT74lGBmaKBDaMSE6C+BhdVKYU6t0+5dhYIdhVR5cfxJeNW9yfiaKBF1Zt+bM3KFMM5JVPrxxvvNbolkBe5ly2kXtzLFZTMnm; AWSALBCORS=Z/u4ssKZI30ai1ITX2YsJ0ZumEcyT74lGBmaKBDaMSE6C+BhdVKYU6t0+5dhYIdhVR5cfxJeNW9yfiaKBF1Zt+bM3KFMM5JVPrxxvvNbolkBe5ly2kXtzLFZTMnm; WSESSIONID=TFBd2phedesI3c2A7f68H3i3Qw3SdhFLAk6FlbfJWsjdXm58zGnFyjuV3b1a3ysx9LmjmYElBgFpe7hY6ffyxaP2QFMVgrZ6XP75L2msWxClzUi9ws0VQ7hNhrkoZ7I3l%Ta3FrD2z; AWSALB=7qK9+1jLixCqoylIRAB41mTuTNKcjyB9beC+Tz4hzgi6cU4ghLV9HvYuHrqhL1fMn2KFmY9nt2YFpg8hsBrIuEmOyx4yxr4m6tvjoxA6X0YKB/CrAGb3ZILPdf2p; AWSALBCORS=7qK9+1jLixCqoylIRAB41mTuTNKcjyB9beC+Tz4hzgi6cU4ghLV9HvYuHrqhL1fMn2KFmY9nt2YFpg8hsBrIuEmOyx4yxr4m6tvjoxA6X0YKB/CrAGb3ZILPdf2p',
            'origin': 'https://eu1.dashboard.clevertap.com',
            'referer': 'https://eu1.dashboard.clevertap.com/44K-948-K85Z/campaigns/campaign/1663745095/report/stats/trend',
            'sec-ch-ua': '"Chromium";v="106", "Google Chrome";v="106", "Not;A=Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
            'x-clevertap-csrf-token': '306336681'
          },
          form: {
            'id': id,
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
          'cookie': 'G_ENABLED_IDPS=google; wzrk_lcbid=844; _hjSessionUser_2030532=eyJpZCI6Ijc1OWZjMTEyLWQwZTAtNWYzOC1iZmEwLTBmZWNiMjJkMzcxNSIsImNyZWF0ZWQiOjE2NTQ2NjQxNDQ3MjQsImV4aXN0aW5nIjp0cnVlfQ==; JSESSIONID=node05b5pk1qeoowc1hzjm6hjkgfkk367570.node0; wzrk_lc=61509701719b47d1a6c892078f3b4c9816681870338441666977433thuc@wecheer.io; wzrk_flags=%7B%22test-app%22%3Afalse%2C%22campaigns2%22%3Atrue%2C%22journeys2%22%3Atrue%2C%22reminder%22%3Afalse%2C%22cascade%22%3Afalse%2C%22push-webhooks-kv-list%22%3Afalse%2C%22appsflyer-onelink-setup%22%3Afalse%2C%22segments-bulk-delete%22%3Afalse%2C%22vs-editor%22%3Afalse%2C%22isNewExportsUI%22%3Afalse%2C%22splitter%22%3Afalse%2C%22features-audit%22%3Afalse%2C%22enhanced_limit_cl%22%3Afalse%2C%22liquid-in-online-channels%22%3Afalse%2C%22multi-app%22%3Afalse%2C%22generic-whatsapp-provider%22%3Afalse%2C%22click-tracking%22%3Afalse%2C%22web-nativedisplay%22%3Afalse%2C%22sms-nexmoct-enabled%22%3Afalse%2C%22test-flagged-feature%22%3Afalse%2C%22amp-enabled%22%3Afalse%2C%22push-render-enhancement%22%3Afalse%2C%22one-hour-export%22%3Afalse%2C%22cr-enhancements%22%3Afalse%7D; WZRK_G=248cf46f479c45eb8356194b48a513a6; eventsListTs=; segmentListTs=1665389479689; _hjIncludedInSessionSample=1; _hjSession_2030532=eyJpZCI6IjBlYWUzYTYxLTdhYWUtNDBlMy05ZmRmLTc0Y2VlNGU4NjNjOCIsImNyZWF0ZWQiOjE2NjY5Nzc0NDEyMTUsImluU2FtcGxlIjp0cnVlfQ==; _hjIncludedInPageviewSample=1; _hjAbsoluteSessionInProgress=0; _hjCachedUserAttributes=eyJhdHRyaWJ1dGVzIjp7IkFjY291bnQgaWQiOiI0NEstOTQ4LUs4NVoiLCJSZWdpb24iOiJldTEiLCJpc1NlbGZTZXJ2ZUFjY291bnQiOmZhbHNlfSwidXNlcklkIjoidGh1Y0B3ZWNoZWVyLmlvIn0=; _hjUserAttributesHash=b958e432f19f53fab2c42337d4780e25; secret_csrf=c2969f48-53c9-47c4-ba23-5ebd0e099489; csrf=306336681; WZRK_S_R74-ZWR-R44Z=%7B%22p%22%3A3%2C%22s%22%3A1666977438%2C%22t%22%3A1666977655%7D; WSESSIONID=ae61vUZLr499vFgk9FWecogftTUhoew30lCiD4mIh2kYKnkQbX3K3K%M42s8BTMki4FFejhJ8pxWJ9INHPUbojCU8A2lVJUpQF0WKcHq9g2nG6yg0VDkqnvp3MaPyUuxKUovsZz%tp3ERDbj; AWSALB=fq7kKUncKeiWq+mYPm4Cez/NIpgR4zBl0EyMxBv6Jj322DCIJdQBwNrjemA/oj3Uo3Ad348QbhOQVnCEjjp1KPxrYmr59IBCeLRSW0ExGMqqaFNo6FJ8jPGT7dA5; AWSALBCORS=fq7kKUncKeiWq+mYPm4Cez/NIpgR4zBl0EyMxBv6Jj322DCIJdQBwNrjemA/oj3Uo3Ad348QbhOQVnCEjjp1KPxrYmr59IBCeLRSW0ExGMqqaFNo6FJ8jPGT7dA5; WSESSIONID=aqg1uOZP94WtvhUkyUW5Foa3tyihL5w8UlKYDKCIBMkyNngVbEAKFy%7U2PjBclk7XF4jj6K8EWW0YIx7PINoZhU0g2zxJLBQIOWhIHhZgBtGNTgKnDuGnuE3WRP8kuJMUvwsYX%XT38xDam; AWSALB=unYDqZfy+8yqrRjP8uUuOx2n9U5O0s9WL2mMuY2+QxHOdJwAOuhaqEYKdqI6l+6hwveTj32RpdAMD3M3xPiSVWGXoGGPspO8PhuSmHuOslXDDHz4K8VPy0aIGDpc; AWSALBCORS=unYDqZfy+8yqrRjP8uUuOx2n9U5O0s9WL2mMuY2+QxHOdJwAOuhaqEYKdqI6l+6hwveTj32RpdAMD3M3xPiSVWGXoGGPspO8PhuSmHuOslXDDHz4K8VPy0aIGDpc',
          'referer': 'https://eu1.dashboard.clevertap.com/44K-948-K85Z/campaigns/',
          'sec-ch-ua': '"Chromium";v="106", "Google Chrome";v="106", "Not;A=Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
          'x-clevertap-csrf-token': '306336681'
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
}
