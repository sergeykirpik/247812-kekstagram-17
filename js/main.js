'use strict';
(function () {
  var MOCK_DATA_SIZE = 25;

  var MESSAGES = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  ];

  var AUTHORS = [
    'Артем', 'Никита', 'Настя', 'Валерий Петрович', 'Надежда Павловна', 'Марина',
  ];

  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
  };

  var rndElement = function (arr) {
    return arr[getRandomInt(0, arr.length - 1)];
  };

  var generateComments = function () {
    var comments = [];
    for (var i = 0; i < getRandomInt(1, 7); i++) {
      comments[i] = {
        avatar: 'img/avatar-{{n}}.svg'.replace('{{n}}', getRandomInt(1, 6)),
        message: rndElement(MESSAGES),
        name: rndElement(AUTHORS),
      };
    }
    return comments;
  };

  var generateMockData = function () {
    var data = [];
    for (var i = 0; i < MOCK_DATA_SIZE; i++) {
      data[i] = {
        url: 'photos/{{i}}.jpg'.replace('{{i}}', i + 1),
        likes: getRandomInt(15, 200),
        comments: generateComments(),
      };
    }
    return data;
  };

  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var renderPicture = function (picture) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

    return pictureElement;
  };

  var generateDOM = function (pictures) {

    var fragment = document.createDocumentFragment();

    pictures.forEach(function (picture) {
      fragment.appendChild(renderPicture(picture));
    });

    document.querySelector('.pictures').appendChild(fragment);
  };

  generateDOM(generateMockData());

})();
