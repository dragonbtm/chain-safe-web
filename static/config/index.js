/**
 * 开发环境
 */
;(function () {
  window.SITE_CONFIG = {};


  // window.SITE_CONFIG['baseUrl'] = 'http://localhost:10080';

  //omni1
  window.SITE_CONFIG['baseUrl'] = 'http://47.244.51.197:10080';
  // api接口请求地址  omni2 47.244.51.197
  // window.SITE_CONFIG['baseUrl'] = 'http://47.75.210.123:10080';



  // api接口请求地址  omni4 47.244.143.123
  // window.SITE_CONFIG['baseUrl'] = 'http://47.244.143.123:10080';



  // cdn地址 = 域名 + 版本号
  window.SITE_CONFIG['domain']  = './'; // 域名
  window.SITE_CONFIG['version'] = '';   // 版本号(年月日时分)
  window.SITE_CONFIG['cdnUrl']  = window.SITE_CONFIG.domain + window.SITE_CONFIG.version;
})();
