
const handleCategory = async () => {
    const response = await fetch(
        "https://openapi.programming-hero.com/api/videos/categories"
    );
    const data = await response.json();
    console.log('data is here',data);

    const tabContainer = document.getElementById('tab-container');

   

    data.data.forEach((category) => {
        
        const div = document.createElement("div");
        div.innerHTML = `
        <a onclick="handleLoadNews('${category.category_id}')" class="tab">${category.category}</a>
        `;
        tabContainer.appendChild(div);
        console.log(div);
        
    });

    

    //console.log('Hi ami ekhane',data.data);
    //handleLoadNews();

    
};

const handleLoadNews = async (categoryId) => {
    console.log(categoryId);

    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await response.json();

    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = "";
    

    data.data.forEach((tube)=>{

        // console.log(tube.authors[0].profile_name);
        const div = document.createElement('div');

        //console.log('verified:',tube.authors[0].verified);

        const totalSeconds = `${tube?.others.posted_date}`;

        console.log('totals:',totalSeconds);
            
        const totalMinutes = Math.floor(totalSeconds / 60);
        
  
        const seconds = totalSeconds % 60;
        console.log('hours:',seconds);
        const hours = Math.floor(totalMinutes / 60);
        console.log('hours:',hours);
        const minutes = totalMinutes % 60;
        console.log('minus:',minutes);

        console.log(hours,'h',minutes,'m',seconds,'s');
 

        div.innerHTML = `
        <div class="card w-80 bg-base-100 shadow-xl  mx-auto lg:mx-0">
                <figure class="relative"><img src=${tube?.thumbnail} alt="" class=" h-52" /> <p class="absolute right-2 top-44 bg-black text-white">${hours}h ${minutes}m ${seconds}s</p>
                </figure>
                <div class="card-body">
                  
                <div class="inline-flex gap-5">
                   <div class="avatar ">
                        <div class="w-14 rounded-full h-fit">
                            <img class="" src=${tube.authors[0].profile_picture}>

                        </div>

                   </div>
                   <div class="">
                        <h2 class="card-title text-sm font-bold">${tube.title}</h2>
                        <div id="test" class="flex gap-1">
                          
                          <p class="">${tube.authors[0].profile_name}</p>

                          
                        </div>
                        
                        
                        <p>${tube.others.views}</p>
                    </div>
                     
                </div>                 
                  
                </div>
              </div>
        `;
        

        cardContainer.appendChild(div);
        console.log(div);

        
    })
};



const handleLoadTube = async (categoryId) => {
    console.log(categoryId);

    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await response.json();

    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = "";

    console.log('My new data for sort',data);
    
    let sortedProducts = data.data.sort(
        (p1, p2) => (convert(p1.others.views) < convert(p2.others.views)) ? 1 : (convert(p1.others.views) > convert(p2.others.views)) ? -1 : 0);

        console.log("Products sorted based on descending order of their prices are:")
        console.log(sortedProducts);


        sortedProducts.forEach((tube)=>{

            // console.log(tube.authors[0].profile_name);
            const div = document.createElement('div');
    
            //console.log('verified:',tube.authors[0].verified);

            const totalSeconds = `${tube?.others.posted_date}`;

        console.log('totals:',totalSeconds);
            
        const totalMinutes = Math.floor(totalSeconds / 60);
        
  
        const seconds = totalSeconds % 60;
        console.log('hours:',seconds);
        const hours = Math.floor(totalMinutes / 60);
        console.log('hours:',hours);
        const minutes = totalMinutes % 60;
        console.log('minus:',minutes);

        console.log(hours,'h',minutes,'m',seconds,'s');

    
            div.innerHTML = `
            <div class="card w-80 bg-base-100 shadow-xl  mx-auto lg:mx-0">
            <figure class="relative"><img src=${tube?.thumbnail} alt="" class=" h-52" /> <p class="absolute right-2 top-44 bg-black text-white">${hours}h ${minutes}m ${seconds}s</p>
            </figure>
                    <div class="card-body">
                      
                    <div class="inline-flex gap-5">
                       <div class="avatar">
                            <div class="w-14 rounded-full  h-fit">
                                <img class="" src=${tube.authors[0].profile_picture}>
    
                            </div>
    
                       </div>
                       <div class="">
                            <h2 class="card-title text-sm font-bold">${tube.title}</h2>
                            <div class="flex gap-1">
                              
                              <p class="">${tube.authors[0].profile_name}</p>
    
                              <img id="vis" style="visibility:hidden" src="verified.png">
                            </div>
                            
                            <p>${tube.others.views}</p>
                        </div>
                         
                    </div>
                      
                        
                      
                      
                    </div>
                  </div>
            `;
    
            
    
            cardContainer.appendChild(div);
            console.log(div);
        })


    
};


function dataSort()
{

    handleLoadTube(1000);

}

function convert(view)
{
    //console.log(view);
    const length = view.length;

    if(view.charAt(length-1)=='K')
    {
        //console.log('Paisi');
        
        const result = view.slice(0,length-1);
        //console.log(result);
        const number = parseFloat(result);
        //console.log(number);

        const finalNumber = number * 1000;
        // console.log(finalNumber);

        return finalNumber;
        
    }
    else{
        return view;
    }
    

    

}



handleCategory();

handleLoadNews(1000);