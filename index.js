async function getData(){
    let city=document.querySelector("input").value;
    async function getLatLog(){
        try{
            let result= await fetch(`http://api.positionstack.com/v1/forward?access_key=b09a88bb2b8e0b605dad692bfaf20c06&query=${city}`);
            let data= await result.json();
            var lat=(data.data[0].latitude);
            var log=(data.data[0].longitude);
            console.log(lat,log);
            try{
                let res= await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${log}&exclude=current,minutely,hourly,alerts&appid=87f4690bd1153a0cf93b19249bae9f87&units=metric`);
                let data =await res.json();
                showData(data);
            }
            catch(error){
                console.log("error:",error);
            }
        }
        catch(error){
            console.log("error:",error);
        }
    }
    
    getLatLog();
}

function showData(data){
    console.log(data);

    let container=document.querySelector("#container");
    container.style.background="darkslategray";
    container.style.border="1px solid teal";
    container.textContent="";

    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

    data.daily.map(function(elem,index){
        console.log(elem,index);
        let div1=document.createElement("div");
        let p1=document.createElement("p");
        let icon1=document.createElement('img');
        p1.textContent=days[index];
        let source1=elem.weather[0].icon;
        icon1.setAttribute("src",`https://openweathermap.org/img/wn/${source1}@2x.png`);
        let min1=document.createElement("p");
        let max1=document.createElement("p");
        let des1=document.createElement("p");
        min1.textContent=elem.temp.min+"°C";
        min1.style.marginTop="-20px";
        max1.textContent=elem.temp.max+"°C";
        max1.style.marginTop="-20px";
        des1.textContent=elem.weather[0].description;
        des1.style.marginTop="-20px";
        des1.style.color="cyan";
        div1.append(p1,icon1,min1,max1,des1);
        container.append(div1);
        document.querySelector("body").append(container);
    });
}