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
  var table = document.getElementById("myTable");
  var row;
  var cell1;
  var cell2;
  var cell3;
  var cell4;
  var cell5;
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
  //table 초기화
  //$("#myTable").empty();

  $.ajax({
    type: "get",
    dataType: "xml",
    url : requestUrl,
    success : function(xml){
      for(var i = 0; i<num; ++i) //테이블 초기화
      {
        if(table.rows.length < 2) //th항까지 남겨놓기 위함
          break;
        table.deleteRow(table.rows.length-1);
      }
      for(var i = 0; i<num; ++i)
      {
        id[i] = $(xml).find('ListLostArticleService').find("row").eq(i).find('ID').text();
        take_place[i] = $(xml).find('ListLostArticleService').find("row").eq(i).find('TAKE_PLACE').text();
        get_name[i] = $(xml).find('ListLostArticleService').find("row").eq(i).find('GET_NAME').text();
        get_date[i] = $(xml).find('ListLostArticleService').find("row").eq(i).find('GET_DATE').text();
        contact[i] = $(xml).find('ListLostArticleService').find("row").eq(i).find('CONTACT').text();
        status[i] = $(xml).find('ListLostArticleService').find("row").eq(i).find('STATUS').text();
        // i 값이 증가할 때마다 테이블 row를 추가한다.
        row = table.insertRow(table.rows.length);
        cell1 = row.insertCell(0); //tr값에 들어가는 td를 증가시킨다.
        cell2 = row.insertCell(1);
        cell3 = row.insertCell(2);
        cell4 = row.insertCell(3);
        cell5 = row.insertCell(4);
        if(id[0] == "")
        {
          cell1.innerHTML = "분실물품이 존재하지 않습니다.";
          break;
        }
        cell1.innerHTML = take_place[i];
        cell2.innerHTML = get_name[i];
        cell3.innerHTML = get_date[i];
        cell4.innerHTML = contact[i];
        cell5.innerHTML = status[i];
        //여기서 params의 값에 따라 ":" 문자를 추가할지 말지 결정하는 코드 구현하기 개졸리니까 자야겠다.
        //resIndex[i] = ":" + take_place[i] + "     " + get_name[i] + "     " + get_date[i] + "    연락처: " + contact[i] + " 상태: " + status[i] + "\n\n";
        //res = res + resIndex[i];
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
