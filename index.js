#!/usr/bin/env node
import {getCode, getNames, getName} from'country-list';
import axios from 'axios';
import chalk from'chalk';
import ora from 'ora';
import figlet from 'figlet';

const userArgs = process.argv.slice(2);
const countryCode = getCode(userArgs[0]);

const spinner = ora('Fetching data').start();

// if (!(userArgs[1] == Number))
// if (userArgs[0]) {
//     if (getNames().includes(userArgs[0])){
//         countryCode = getCode(userArgs[0]);
//     } else {
//         console.log('Please provide a valid country name (see list below):');
//         console.log(getNames());
//     };
// }
const year = userArgs[1] || new Date().getFullYear();

const getHolidays = async () => {
    try {
        const response = await axios.get(
            `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`
        );
        if(response.status === 200){
            spinner.succeed('Data feteched !');
            return response.data;
        }
    } catch (error) {
        spinner.fail("This country does not exist in the API");
    }
};

const displayHolidays = async () => {
    try {
        const holidays = await getHolidays();
        holidays.map((holiday) => {
            console.log(`${chalk.greenBright.underline(holiday.date)} : ${chalk.magentaBright(holiday.name)}, a.k.a. "${chalk.blueBright(holiday.localName)}"`)});
    } catch (error) {
        spinner.fail("This country does not exist in the API");
    }
};

displayHolidays();