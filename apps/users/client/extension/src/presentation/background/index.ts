import 'reflect-metadata';

chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});
