/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [];

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

let crdContainment = document.querySelector('.cards');



axios.get('https://api.github.com/users/NicholasInterest1')
  .then( (response) => {
    console.log(response);
    let nE = cardCreator(response.data);
    crdContainment.appendChild(nE);
  })
  .catch( (err) => {
    console.log(err);
  });




axios.get('https://api.github.com/users/NicholasInterest1/followers')
  .then( (response) => {
    console.log(response);
    const followersArray = [];
    response.data.forEach( (follower) => {
      followersArray.push(follower.url)
    });
    console.log(followersArray);
    followersArray.forEach( API => {
      axios.get(API)
        .then ( (response) => {
          console.log(response);
          let nE = cardCreator(response.data);
          crdContainment.appendChild(nE);
        });
    })
  })
  .catch( (err) => {
    console.log(err);
  });
 



function cardCreator(obj){
  
  const newCard = document.createElement('div');
  newCard.classList.add('card');

  const cardImg = document.createElement('img');
  cardImg.src = obj.avatar_url;

  const cardInfo = document.createElement('div');
  cardInfo.classList.add('card-info');

  const cardName = document.createElement('h3');
  cardName.classList.add('name');
  cardName.textContent = obj.name;

  const cardUsername = document.createElement('p');
  cardUsername.classList.add('username');
  cardUsername.textContent = obj.login;

  const cardUserLocation = document.createElement('p');
  cardUserLocation.textContent = obj.location;

  const cardUserProfileDiv = document.createElement('p');
  cardUserProfileDiv.textContent = `Profile: `;

  const cardUserProfileAnchor = document.createElement('a');
  cardUserProfileAnchor.href = obj.html_url;
  cardUserProfileAnchor.textContent = obj.html_url;

  const cardUserFollowersCount = document.createElement('p');
  cardUserFollowersCount.textContent = `Followers: ${obj.followers}`;

  const cardUserFollowingCount = document.createElement('p');
  cardUserFollowingCount.textContent = `Following: ${obj.following}`;

  const cardUserBio = document.createElement('p');
  cardUserBio.textContent = `Bio: ${obj.bio}`;

  
  newCard.appendChild(cardImg);
  newCard.appendChild(cardInfo);
  cardInfo.appendChild(cardName);
  cardInfo.appendChild(cardUsername);
  cardInfo.appendChild(cardUserLocation);
  cardInfo.appendChild(cardUserProfileDiv);
  cardUserProfileDiv.appendChild(cardUserProfileAnchor);
  cardInfo.appendChild(cardUserFollowersCount);
  cardInfo.appendChild(cardUserFollowingCount);
  cardInfo.appendChild(cardUserBio);

  //return the card
  return newCard;
};
/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
