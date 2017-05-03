$(document).ready(function(){
  request();
});
function request() {
  var defaultUrl = "http://openapi.seoul.go.kr:8088/4b6652794864646f34317054666564/xml/ListLostArticleService";
  var requestUrl = defaultUrl+"/1/"
  var num = "10"
  var params = "s1";
  var res = "";
  var infoError = "";
  var take_place = [];
  var get_name = [];
  var get_date = [];
  var resIndex = [];
  var contact = [];
  var status = [];
  var id = [];

  requestUrl = requestUrl + num + "/" + params;
  document.getElementById("beforeProcess").src = requestUrl;

  $.ajax({
    type: "get",
    dataType: "xml",
    url : requestUrl,
    success : function(xml){
      //$(xml).find('SearchLostArticleService').find("row");
      for(var i = 0; i<num; ++i)
      {
        id[i] = $(xml).find('ListLostArticleService').find("row").eq(i).find('ID').text();
        take_place[i] = $(xml).find('ListLostArticleService').find("row").eq(i).find('TAKE_PLACE').text();
        get_name[i] = $(xml).find('ListLostArticleService').find("row").eq(i).find('GET_NAME').text();
        get_date[i] = $(xml).find('ListLostArticleService').find("row").eq(i).find('GET_DATE').text();
        contact[i] = $(xml).find('ListLostArticleService').find("row").eq(i).find('CONTACT').text();
        status[i] = $(xml).find('ListLostArticleService').find("row").eq(i).find('STATUS').text();
        resIndex[i] = id[i] + take_place[i] + get_name[i] + " " + get_date[i] + " 연락처: " + contact[i] + " 상태: " + status[i] + "\n";
        res = res + resIndex[i];
      }
      document.getElementById("mytextarea").value = res;

    }
  });
}
function article_information() {
  var defaultUrl = "http://openapi.seoul.go.kr:8088/4b6652794864646f34317054666564/xml/ListLostArticleService";
  var requestUrl = defaultUrl+"/1/"
  var num = "100"
  var params = "s1";
  var res = "";
  var take_place = [];
  var get_name = [];
  var get_date = [];
  var resIndex = [];
  var contact = [];
  var status = [];
  var id = [];

  params = ($("select[name='traffic']")).val();

  requestUrl = requestUrl + num + "/" + params;
  console.log(requestUrl);
  $.ajax({
    type: "get",
    dataType: "xml",
    url : requestUrl,
    success : function(xml){
      //$(xml).find('SearchLostArticleService').find("row");
      for(var i = 0; i<num; ++i)
      {
        id[i] = $(xml).find('ListLostArticleService').find("row").eq(i).find('ID').text();
        take_place[i] = $(xml).find('ListLostArticleService').find("row").eq(i).find('TAKE_PLACE').text();
        get_name[i] = $(xml).find('ListLostArticleService').find("row").eq(i).find('GET_NAME').text();
        get_date[i] = $(xml).find('ListLostArticleService').find("row").eq(i).find('GET_DATE').text();
        contact[i] = $(xml).find('ListLostArticleService').find("row").eq(i).find('CONTACT').text();
        status[i] = $(xml).find('ListLostArticleService').find("row").eq(i).find('STATUS').text();
        resIndex[i] = ":" + take_place[i] + "     " + get_name[i] + "     " + get_date[i] + "    연락처: " + contact[i] + " 상태: " + status[i] + "\n\n";
        res = res + resIndex[i];
      }
      if (id[0] == "")
      {
        document.getElementById("getinfoTxt").value = "분실물품이 존재하지 않습니다.";
      }
      else
      {
        document.getElementById("getinfoTxt").value = res;
      }

    }
  });
}
