#!/usr/bin/env node
import { program } from 'commander';
import colors from 'colors';
import axios, { AxiosResponse } from 'axios';

interface IWeatherResponse {
    status: string;
    count: number;
    info: string;
    infoCode: string;
    lives: ILive[];
}
interface ILive {
    province: string;
    city: string;
    adcode: string;
    weather: string;
    temperature: string;
    winddirection: string;
    windpower: string;
    humidity: string;
    reporttime: string;
}

(function main() {
    program.version('1.0.0').option('-c, --city <city>', 'add city code').parse(process.argv);
    const cityCode = program.city;
    if (process.argv.length <= 2) {
        program.outputHelp();
        process.exit();
    }
    const KEY = '333523eadd588b00fbd888306e7c8e7e';
    axios
        .get('https://restapi.amap.com/v3/weather/weatherInfo', {
            params: {
                key: KEY,
                city: cityCode
            }
        })
        .then((res: AxiosResponse<IWeatherResponse>) => {
            const log = console.log;
            const {
                reporttime,
                province,
                city,
                weather,
                temperature,
                winddirection,
                windpower,
                humidity
            } = res.data.lives[0];
            log(colors.yellow(reporttime));
            log(colors.cyan(`${province} ${city}`));
            log(colors.green(`天气：${weather}\n温度：${temperature}\n风向：${winddirection}\n风力：${windpower}\n湿度：${humidity}`));
        });
})();
