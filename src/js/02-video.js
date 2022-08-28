import Player from '@vimeo/player';
import storageApi from './storage';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'videoplayer-current-time';
const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
loadPage();

player.on(
  'timeupdate',
  throttle(data => {
    storageApi.save(STORAGE_KEY, data.seconds);
  }, 1000)
);

function loadPage() {
  player.setCurrentTime(storageApi.load(STORAGE_KEY));
}
