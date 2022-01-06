////////////////////// Query Selectors and variables //////////////////////////////

const countires = document.querySelector(".countries");
const header = document.querySelector(".header");
const dropdownDiv = document.querySelector(".dropdown");
const dropdownContent = document.querySelector(".dropdown-content");
const filter = document.querySelectorAll(".filter");
const countrySearch = document.querySelector(".country-search");
const toggle = document.querySelector(".toggle");
const mode = document.querySelector(".mode");

var selectedRegion = "";
var inputValue = "";

////////////// Getting All Countries Function ///////////////////

async function getAllCountries(){
  const url = await fetch('https://restcountries.com/v3.1/all');
  const res = await url.json();
  res.forEach(element =>{
    showCountry(element)
  });
  showCountry(res);
}
getAllCountries();

//////////////// Get Country By Name Function /////////////////

async function getCountryByName(value){
  const url = await fetch('https://restcountries.com/v2/name/' + value);
  const res = await url.json();
  $("div.country").remove();
  res.forEach(element =>{
    showFoundCountry(element)
  });
  showFoundCountry(res);
}

//////////////// Get Countries By Region /////////////////////

async function getCountryByRegion(region){
  const url = await fetch('https://restcountries.com/v3.1/region/' + region);
  const res = await url.json();
  $("div.country").remove();
  res.forEach(element =>{
    showCountry(element)
  });
  showCountry(res);
}

//////////////// Displaying Countries Function ////////////////

function showCountry(data){

  const country = document.createElement("div")
  country.classList.add("country")
  country.innerHTML= '<div class="country-flag"><img src="'+ data.flags.svg +'" alt=""></div><div class="country-info"><h5>'+ data.name.common +'</h5><p><strong class="strong">Population:</strong>'+ data.population +'</p><p class="regionName"><strong class="strong">Region:</strong>'+ data.region + '</p><p><strong class="strong">Capital:</strong>' + data.capital + '</p></div>';
  countires.appendChild(country)
  country.addEventListener("click" , function(){
    var cName = country.lastChild.firstChild.innerText;
    individualCountry(cName);
  })
}

//////////////// Individual Country Page ///////////////////////

async function individualCountry(data){

  const url = await fetch('https://restcountries.com/v3.1/name/'+ data + '?fullText=true');
  const res = await url.json();
  $("div.countries").remove();
  $("div.search-country").remove();
  console.log(res);
  showIndividualCountry(res);
};

///////////////// Recreating Divs after hitting back////////////////

function reCreateDivs(){

/////////////// Creating Country Searchbar and Filter by region dropdown//////////////////////
  const countrySearch = document.createElement("div")
  countrySearch.classList.add("search-country")
  countrySearch.innerHTML = '<div class="form-control"><i class="fas fa-search"></i><input type="text" class="country-search" name="" value="" placeholder="Search for a country..."></div><div class="dropdown-menu"><div class="dropdown"><p class="filter-by-region">Filter by Region</p><button><i class="fas fa-caret-down"></i></button></div><div class="dropdown-content region"><p class="filter">All</p><p class="filter">Africa</p><p class="filter">America</p><p class="filter">Asia</p><p class="filter">Europe</p><p class="filter">Oceania</p></div></div>';
  document.body.appendChild(countrySearch);

//////////////////Searching country using searchbar//////////////

  document.querySelector(".country-search").addEventListener("input" , ()=>{
    var inputValue = document.querySelector(".country-search").value;
    if(inputValue === ""){
      $("div.country").remove();
      getAllCountries();
    }
    else{
        getCountryByName(inputValue);
    }
  });

////////////Toggling Dropdown button //////////////////
  document.querySelector(".dropdown").addEventListener("click" , ()=>{
    document.querySelector(".dropdown-content").classList.toggle("region");
  });

//////////Filtering countries by region ////////////////

  document.querySelectorAll(".filter").forEach(element =>{

    element.addEventListener("click" , ()=>{

      var selectedRegion = element.innerText;
      document.querySelector(".dropdown-content").classList.toggle("region");
      document.querySelector(".filter-by-region").innerText = selectedRegion;

      if(selectedRegion === "All"){
        $("div.country").remove();
        getAllCountries();
      }
      else{
        getCountryByRegion(selectedRegion);
      }
    });
  });
}

////////////////////// Country Detail ////////////////////////////

function showIndividualCountry(data){

  for(let i =0 ; i<Object.values(data[0].name.nativeName).length ; i++){
    console.log(Object.values(data[0].name.nativeName)[i]);

  };

  const details = document.createElement("div")
  details.classList.add("detailsPage")
  details.innerHTML= '<button type="button" class="back" name="button"><i class="fas fa-arrow-left"></i>Back</button><div class="country-details"><div class="image"><img src="'+ data[0].flags.svg +'" alt=""></div><div class="detail"><div class="detail-left"><h5>' + data[0].name.common +'</h5><p><strong>Native Name: </strong>'+ Object.values(data[0].name.nativeName)[0].official +'</p><p><strong>Population: </strong>' + data[0].population +'</p><p><strong>Region: </strong>' + data[0].region +'</p><p><strong>Sub-Region: </strong>' + data[0].subregion +'</p><p><strong>Capital: </strong>' + data[0].capital +'</p></div><div class="detail-right"><p><strong>Top Level Domain: </strong>'+ data[0].tld[0] +'</p><p><strong>Currencies: </strong>' + Object.values(data[0].currencies)[0].name +'</p><p><strong>Languages: </strong>'+ Object.values(data[0].languages)[0] +'</p></div></div></div>';
  document.body.appendChild(details);

  const back = document.querySelector(".back");
  back.addEventListener("click" , function(){
    $("div.detailsPage").remove();
    reCreateDivs();

    const countries = document.createElement("div")
    countries.classList.add("countries")
    document.body.appendChild(countires);


    getAllCountries();
  });
}


///////////// Displaying Searched Countries Function /////////////

function showFoundCountry(data){
  const country = document.createElement("div")
  country.classList.add("country")
  country.innerHTML= '<div class="country-flag"><img src="'+ data.flags.svg +'" alt=""></div><div class="country-info"><h5>'+ data.name +'</h5><p><strong class="strong">Population:</strong>'+ data.population +'</p><p class="regionName"><strong class="strong">Region:</strong>'+ data.region + '</p><p><strong class="strong">Capital:</strong>' + data.capital + '</p></div>';
  countires.appendChild(country);

  country.addEventListener("click" , function(){
    var cName = country.lastChild.firstChild.innerText;
    individualCountry(cName);
  })
}

/////////Dropdown Toggle EventListener /////////////////////
dropdownDiv.addEventListener("click" , ()=>{
  dropdownContent.classList.toggle("region");
});

/////////// Dark Mode Toggle Function////////////////////

toggle.addEventListener("click" , ()=>{
  mode.classList.toggle("fas");
  document.body.classList.toggle("darkMode");
});


///////////////Filtering Countries by Region //////////////////////////
filter.forEach(element =>{

  element.addEventListener("click" , ()=>{

    var selectedRegion = element.innerText;
    dropdownContent.classList.toggle("region");
    document.querySelector(".filter-by-region").innerText = selectedRegion;

    if(selectedRegion === "All"){
      $("div.country").remove();
      getAllCountries();
    }
    else{
      getCountryByRegion(selectedRegion);
    }
  });
});

///////// Searching A Country ///////////////

document.querySelector(".country-search").addEventListener("input" , ()=>{
  var inputValue = document.querySelector(".country-search").value;
  if(inputValue === ""){
    $("div.country").remove();
    getAllCountries();
  }
  else{
      getCountryByName(inputValue);
  }
});
