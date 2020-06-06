'use strict';

var objectsNumber = 25;
var minPhotosNumber = 1;
var maxPhotosNumber = 25;
var minMessageNumber = 1;
var maxMessageNumber = 2;
var minLikesNumber = 15;
var maxLikesNumber = 200;
var minAvatarNumber = 1;
var maxAvatarNumber = 6;
var commentsArray = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var userNamesArray = ['Артём', 'Лёша', 'Петя', 'Енот', 'Квокка', 'Степан', 'Лена', 'Наташа'];

var template = document.querySelector('#picture').content.querySelector('.picture');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomPhotoSrc() {
  return 'photos/' + getRandomInt(minPhotosNumber, maxPhotosNumber) + '.jpg';
}

function getRandomAvatar() {
  return 'img/avatar-' + getRandomInt(minAvatarNumber, maxAvatarNumber) + '.svg';
}

var getRandomComment = function () {
  var messages = [];
  var messageCount = getRandomInt(minMessageNumber, maxMessageNumber);
  for (var i = 0; i < messageCount; i++) {
    messages.push(commentsArray[getRandomInt(0, commentsArray.length - 1)]);
  }

  return {
    avatar: getRandomAvatar(),
    message: messages.join(' '),
    name: userNamesArray[getRandomInt(0, commentsArray.length - 1)]
  };
};

function getRandomPhotos(count) {
  var photosArray = [];

  for (var i = 0; i < count; i++) {
    photosArray.push({
      photoInfo: {
        url: getRandomPhotoSrc(),
        description: 'lorem ipsum xe-xe',
        likes: getRandomInt(minLikesNumber, maxLikesNumber),
        comments: getRandomComment()
      }
    });
  }

  return photosArray;
}

function createDOMElement(photo) {
  var element = template.cloneNode(true);
  element.querySelector('.picture__img').src = photo.photoInfo.url;
  element.querySelector('.picture__comments').textContent = photo.photoInfo.comments;
  element.querySelector('.picture__likes').textContent = photo.photoInfo.likes;
  return element;
}

function addCreatedPhotos() {
  var photos = getRandomPhotos(objectsNumber);
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(createDOMElement(photos[i]));
  }
  document.querySelector('.pictures').appendChild(fragment);
}

addCreatedPhotos();
