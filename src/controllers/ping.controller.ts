import {inject} from '@loopback/core';
import {
  Request,
  RestBindings,
  get,
  response,
  ResponseObject,
  param,
} from '@loopback/rest';
import { ClevertabService } from '../services';

/**
 * OpenAPI response for ping()
 */
const PING_RESPONSE: ResponseObject = {
  description: 'Ping Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'PingResponse',
        properties: {
          greeting: {type: 'string'},
          date: {type: 'string'},
          url: {type: 'string'},
          headers: {
            type: 'object',
            properties: {
              'Content-Type': {type: 'string'},
            },
            additionalProperties: true,
          },
        },
      },
    },
  },
};

/**
 * A simple controller to bounce back http requests
 */
export class PingController {
  constructor(
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @inject('services.ClevertabService') protected clevertabService: ClevertabService,
    ) {}

  // Map to `GET /ping`
  // @get('/ping')
  // @response(200, PING_RESPONSE)
  // ping(): object {
  //   // Reply with a greeting, the current time, the url, and request headers
  //   return {
  //     greeting: 'Hello from LoopBack',
  //     date: new Date(),
  //     url: this.req.url,
  //     headers: Object.assign({}, this.req.headers),
  //   };
  // }

  @get('/test')
  @response(200, PING_RESPONSE)
  async find(
    @param.query.string('from') from: string,
    @param.query.string('to') to: string,
    @param.query.string('param') param: string,): Promise<any> {
    let split: any = param.split('-H ')
    let cookie = ''
    let csrf = ''
    for (const iterator of split) {
      if (iterator.toString().search("cookie") == 1) {
        cookie = iterator.toString().substr(9, iterator.toString().length - 15)
      }
      if (iterator.toString().search("x-clevertap-csrf-token") == 1) {
        csrf = iterator.toString().substr(25, iterator.toString().length - 43)
      }
    }

    let lst: any = await this.clevertabService.GetListCampaign(csrf,cookie)
    let arr: any = []
    let count = 0
    for (const iterator of JSON.parse(lst.body).targets) {
      let id = iterator._id
      let name = iterator.name
      console.log('process... '+ count + '/' + JSON.parse(lst.body).targets.length);
      console.log(name);
      count++;
      let details: any = await this.clevertabService.GetDetailCampaign(csrf,cookie,id,from,to);
      if(details.body != '{ "All" : { }}'){
        let obj : any = []
        let split1:any = JSON.stringify(JSON.parse(details.body).All).split('"2')
        for (const iterator of split1) {
          if(iterator != '{'){
            let split2:any = iterator.split('":{')
            let sent = JSON.parse(('{'+split2[1]).replace('}}','}').replace('},','}'))
            arr.push({
              date: '2' + split2[0],
              sent: sent.sent,
              id: id,
              name: name
            })
            console.log(new Date().getTime());
          }
        }
      }else{
        arr.push({
          date: '0',
          sent: '0',
          id: id,
          name: name
        })
      }
    }
    console.log('Done !!!');    
    return {};
  }
}
