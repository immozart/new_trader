var fetchUrl = require("fetch").fetchUrl;
fetchUrl("https://iss.moex.com/iss/engines/stock/markets/shares/securities/sber.json", function (error, meta, body) {

    var path = [];
    function getDataFromJson(bodyARG) {
        for (let key in bodyARG) {
            if (typeof (bodyARG[key]) === 'object') {
                path.push(key);
                // console.log('>>>> ' + path)
                getDataFromJson(bodyARG[key]);
            }
            else {
                console.log(`${path},${key} : ${bodyARG[key]}`);
                if (bodyARG[key] === 10) {
                    console.log(`-------->${path},${key} : ${bodyARG[key]}`);
                }
            }       
        }
        path.pop()
    }
    // let arr1 = [11, 12, 13];
    // let obj1 = { val1: 21, val2: 22, val3: 23 };
    // let testArr = [1, 2, 3];
    // obj1.arr0001 = arr1;
    // testArr.push(obj1);
    // console.log(testArr)
    //getDataFromJson(testArr);

    getDataFromMoex = async () => {
        try {
            if (argSecc.length == 4) {
                console.log('---------------------------------------------------------');
                const dataFromMoex = await fetch('https://iss.moex.com/iss/engines/stock/markets/shares/securities/sber.json');
                const moexJson = await dataFromMoex.json();
                const parsedMoexJson = await JSON.parse(moexJson);
                console.log(parsedMoexJson);
                moexFactor = parsedMoexJson['securities']['data'][1][4];
                console.log('---------------------------------------------------------' + moexFactor);
                this.setState({
                    moexFactor
                });
            }
        } catch (e) {
            console.error(e);
        }
    };


    let parsedBody = JSON.parse(body);
    getDataFromJson(parsedBody);
   //securities,data,1,4 
    console.log(parsedBody['securities']['data'][1][4])
});

