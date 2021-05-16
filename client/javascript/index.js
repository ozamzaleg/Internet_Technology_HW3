const counties = [
    "",
    "Afghanistan",
    "land Islands", 
    "Albania",
    "Algeria",
    "American Samoa",
    "AndorrA",
    "Angola",
    "Anguilla",
    "Antarctica",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize", 
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Bouvet Island",
    "Brazil",
    "British Indian Ocean Territory",
    "Brunei Darussalam",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cape Verde",
    "Cayman Islands",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Christmas Island",
    "Cocos (Keeling) Islands",
    "Colombia",
    "Comoros",
    "Congo",
    "Congo, The Democratic Republic of the",
    "Cook Islands",
    "Costa Rica",
    "Cote DIvoire",
    "Croatia",
    "Cuba",
    "Cyprus", 
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Ethiopia",
    "Falkland Islands (Malvinas)",
    "Faroe Islands",
    "Fiji",
    "Finland",
    "France", 
    "French Guiana",
    "French Polynesia",
    "French Southern Territories",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece", 
    "Greenland",
    "Grenada",
    "Guadeloupe",
    "Guam",
    "Guatemala", 
    "Guernsey",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Heard Island and Mcdonald Islands",
    "Holy See (Vatican City State)",
    "Honduras", 
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India", 
    "Indonesia",
    "Iran, Islamic Republic Of",
    "Iraq",
    "Ireland",
    "Isle of Man",
    "Israel",
    "Italy", 
    "Jamaica",
    "Japan",
    "Jersey", 
    "Jordan", 
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Lao Democratic Republic",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libyan Arab Jamahiriya",
    "Liechtenstein",
    "Lithuania", 
    "Luxembourg",
    "Macao", 
    "Macedonia, The Former Yugoslav Republic of",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Martinique",
    "Mauritania",
    "Mauritius", 
    "Mayotte", 
    "Mexico",
    "Micronesia, Federated States of",
    "Moldova, Republic of",
    "Monaco",
    "Mongolia",
    "Montenegro", 
    "Montserrat", 
    "Morocco",
    "Mozambique", 
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "Netherlands Antilles",
    "New Caledonia", 
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "Niue",
    "Norfolk Island",
    "North Korea",
    "Northern Mariana Islands",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau", 
    "Palestinian Territory, Occupied",
    "Panama",
    "Papua New Guinea", 
    "Paraguay",
    "Peru",
    "Philippines",
    "Pitcairn",
    "Poland",
    "Portugal", 
    "Puerto Rico", 
    "Qatar",
    "Reunion",
    "Romania",
    "Russian Federation",
    "RWANDA",
    "Saint Helena",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Pierre and Miquelon",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Georgia and the South Sandwich Islands",
    "South Korea",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname", 
    "Svalbard and Jan Mayen",
    "Swaziland",
    "Sweden",
    "Switzerland",
    "Syrian Arab Republic",
    "Taiwan, Province of China",
    "Tajikistan",
    "Tanzania, United Republic of",
    "Thailand", 
    "Timor-Leste",
    "Togo",
    "Tokelau",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey", 
    "Turkmenistan",
    "Turks and Caicos Islands",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "United States Minor Outlying Islands",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela",
    "Viet Nam", 
    "Virgin Islands, British", 
    "Virgin Islands, U.S.",
    "Wallis and Futuna",
    "Western Sahara",
    "Yemen",
    "Zambia",
    "Zimbabwe",
];

function countriesOptions() {
    var countriesList = "<select id='country' name='country'>";

    counties.forEach(country => {
        countriesList += "<option value='" + country + "'>" + country + "</option>";
    });

    countriesList += "</select>";
    document.getElementById('countries').innerHTML = countriesList;
}

$(() => {
    const url = document.URL;
    const page = url.includes('=') ? url.substring(url.indexOf('=') + 1) : 1;
    
    countriesOptions();
    
    $("#addPlaceForm").validate({
        errorClass: "error fail-alert",
        messages: {
            name: "Please enter name",
            country: "Please select country",
            description: "Please enter description",
        },
        rules: {
            name: "required",
            country: "required",
            description: "required"
        },
    });

    $.get('http://localhost:8080/places?page=' + page, data => {
        renderPlaces(data);
    });
});

function renderPlaces(data) {
    var { current, previous, next } = data;
    var buttons = "";
    
    if (current.length !== 0) {
        var placesTable = `
            <table>
                <tr>
                    <th width='33%'>Name</th>
                    <th width='33%'>Country</th>
                    <th width='33%'>Likes</th>
                </tr>`;

        current.map(place => {
            placesTable += `
                <tr>
                    <td><a class='placeLink' href='../client/place.html?id=${ place._id }'>${ place.name }</a></td>
                    <td>${ place.country }</td>
                    <td>${ place.likes }</td>
                </tr>
            `;
        })

        placesTable += `</table>`;
    } else {
        placesTable += `<h2>There is no places right now</h2>`;
    }

    buttons = previous ? `<a href='index.html?page=${previous}' class='previousPageButton'>Previous</a>` : "";
    buttons += next ? `<a href='index.html?page=${next}' class='nextPageButton'>Next</a>` : "";
    
    document.getElementById('places').innerHTML = placesTable;
    document.getElementById('paginationButtons').innerHTML = buttons;
}