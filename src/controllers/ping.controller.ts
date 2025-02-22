import { inject } from "@loopback/core";
import {
  Request,
  RestBindings,
  get,
  response,
  ResponseObject,
  param,
} from "@loopback/rest";
import { type } from "os";
import { ClevertabService } from "../services";
import data from "./dataaaa.json";

/**
 * OpenAPI response for ping()
 */
const PING_RESPONSE: ResponseObject = {
  description: "Ping Response",
  content: {
    "application/json": {
      schema: {
        type: "object",
        title: "PingResponse",
        properties: {
          greeting: { type: "string" },
          date: { type: "string" },
          url: { type: "string" },
          headers: {
            type: "object",
            properties: {
              "Content-Type": { type: "string" },
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
    @inject("services.ClevertabService")
    protected clevertabService: ClevertabService
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

  @get("/download-campaigns")
  @response(200, PING_RESPONSE)
  async find(
    @param.query.string("from") from: string,
    @param.query.string("to") to: string,
    @param.query.string("param") param: string
  ): Promise<any> {
    let split: any = param.split("-H ");
    let cookie = "";
    let csrf = "";
    for (const iterator of split) {
      if (iterator.toString().search("cookie") == 1) {
        cookie = iterator.toString().substr(9, iterator.toString().length - 15);
      }
      if (iterator.toString().search("x-clevertap-csrf-token") == 1) {
        csrf = iterator.toString().substr(25, iterator.toString().length - 31);
      }
    }
    let lst: any = await this.clevertabService.GetListCampaign(csrf, cookie);

    let arr: any = [];
    let count = 0;
    for (const iterator of JSON.parse(lst.body).targets) {
      let id = iterator._id;

      let name = iterator.name;
      console.log(
        "process... " + count + "/" + JSON.parse(lst.body).targets.length
      );
      console.log(name);
      count++;
      let details: any = await this.clevertabService.GetDetailCampaign(
        csrf,
        cookie,
        id,
        from,
        to
      );
      if (details.body != '{ "All" : { }}') {
        let obj: any = [];
        let split1: any = JSON.stringify(JSON.parse(details.body).All).split(
          '"2'
        );
        for (const iterator of split1) {
          if (iterator != "{") {
            let split2: any = iterator.split('":{');
            let sent = JSON.parse(
              ("{" + split2[1]).replace("}}", "}").replace("},", "}")
            );
            arr.push({
              date: "2" + split2[0],
              sent: sent.sent,
              id: id,
              name: name,
              error: sent.errors,
            });
            console.log(new Date().getTime());
          }
        }
      } else {
        arr.push({
          date: "0",
          sent: "0",
          id: id,
          name: name,
          error: "",
        });
      }
    }

    var XLSX = require("xlsx");
    const date = new Date();
    const nameGenerate =
      "FileExport_Campaign_" + Date.parse(date.toString()) + ".xlsx";
    let fileName = `public/` + nameGenerate;
    const ws: any = XLSX.utils.json_to_sheet(arr);
    const wb: any = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    XLSX.writeFile(wb, fileName);
    console.log("Done !!!");
    return { Status: "Successfuly !!!" };
  }

  @get("/download-journeys")
  @response(200, PING_RESPONSE)
  async getJourney(
    @param.query.string("from") from: string,
    @param.query.string("to") to: string,
    @param.query.string("param") param: string
  ): Promise<any> {
    let split: any = param.split("-H ");
    let cookie = "";
    let csrf = "";
    for (const iterator of split) {
      if (iterator.toString().search("cookie") == 1) {
        cookie = iterator.toString().substr(9, iterator.toString().length - 15);
      }
      if (iterator.toString().search("x-clevertap-csrf-token") == 1) {
        csrf = iterator.toString().substr(25, iterator.toString().length - 43);
      }
    }

    let lstJourneys: any = await this.clevertabService.GetListJourneys(
      csrf,
      cookie
    );
    // let itemJourney: any = await this.clevertabService.GetIDJourneys(csrf, cookie, 85, from, to)
    // let nodeStats: any = await this.clevertabService.GetNodeStats(csrf, cookie, 25021, from, to)

    let arr: any = [];
    let arrNodeID: any = [];
    let count = 0;
    for (const iterator of JSON.parse(lstJourneys.body).targets) {
      let id = iterator._id;
      let name = iterator.name;
      console.log(
        "process... " +
          count +
          "/" +
          JSON.parse(lstJourneys.body).targets.length
      );
      console.log(name);
      count++;

      let itemJourney: any = await this.clevertabService.GetIDJourneys(
        csrf,
        cookie,
        id,
        from,
        to
      );
      let object = JSON.parse(itemJourney.body).root[0];
      for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
          if (key == "path") {
            const element = object[key];
            for (const itemKey in element) {
              let key = element[itemKey].key;
              if (key.substr(0, 7) == "message") {
                const _id = element[itemKey].steps[0]._id;
                arrNodeID.push({
                  journeyID: id,
                  name: name,
                  nodeStatID: _id,
                  type: itemKey,
                });
                console.log(JSON.stringify({
                  journeyID: id,
                  name: name,
                  nodeStatID: _id,
                  type: itemKey,
                }));
              }
            }
          }
        }
      }
    }

    for (const iterator of arrNodeID) {
      let nodeStats: any = await this.clevertabService.GetNodeStats(
        csrf,
        cookie,
        iterator.nodeStatID,
        from,
        to
      );
      let type;
      if (iterator.type.search("message_email") != -1) {
        type = "Email";
      } else if (iterator.type.search("message_sms") != -1) {
        type = "SMS";
      }

      if (nodeStats.body != '{ "All" : { }}') {
        let obj = JSON.parse(nodeStats.body)["All"];
        for (const key in obj) {
          const element = obj[key];
          arr.push({
            JOURNEYID: iterator.journeyID,
            JOURNEYNAME: iterator.name,
            TYPE: type,
            DATE: key,
            SENT: element.sent,
            VIEWED: element.viewed,
            ERRORS: element.errors,
          });
          console.log('Array existing: ' + arr.length);
        }
      } else {
        arr.push({
          JOURNEYID: iterator.journeyID,
          JOURNEYNAME: iterator.name,
          TYPE: type,
          DATE: "-",
          SENT: 0,
          VIEWED: 0,
          ERRORS: 0,
        });
        console.log('Array existing: ' + arr.length);
        
      }
    }

    var XLSX = require("xlsx");
    const date = new Date();
    const nameGenerate =
      "FileExport_Journeys_" + Date.parse(date.toString()) + ".xlsx";
    let fileName = `public/` + nameGenerate;
    const ws: any = XLSX.utils.json_to_sheet(arr);
    const wb: any = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    XLSX.writeFile(wb, fileName);
    console.log("Done !!!");
    return { Status: "Successfuly !!!" };
  }
}
