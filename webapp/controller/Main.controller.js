sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("nt.zprojectodatae0404.controller.Main", {
            formatter: {
                dateTime: function(oDate){
                    let oDateTimeInstance;
                    oDateTimeInstance = sap.ui.core.format.DateFormat.getDateTimeInstance({
                        pattern : 'yyyy-MM-dd hh:mm:ss'
                    });
                    return oDateTimeInstance.format(oDate); //pattern에 맞춰서 string으로 포맷이 된다. return 함.
                }
            },
            onInit: function () {

            },
            onChange: function(oEvent){
                //버튼 클릭 시 Detail 화면으로 이동
                var oRouter = this.getOwnerComponent().getRouter();
                var sPath = oEvent.getParameters().listItem.getBindingContextPath();
                var sKey = this.getView().getModel().getProperty(sPath+'/OrderID');

                oRouter.navTo("RouteDetail", {
                    "key" : sKey
                });
                
                // navTo(1,2,3)
                //      1: Router Name
                //      2: Parameters (전달해야할 값 등록해서 사용할 수 있음)
                //      3: Route History Clear (라우트 히스토리 클리어할건지)
            },
            onValueHelpRequest: function() {
                /*
                    Dialog 오픈

                    해당 Dialog 안에 sap.ui.table.Table 세팅 후,
                    /Customers 안에 바인딩한다. 표시할 필드는 CustomerID, CompanyName
                    팝업에 close 버튼을 구성하여 클릭 시 팝업이 닫히도록 한다.

                */
                // sap.m.MessageToast.show("input value help 실행");
                var oDialog = this.byId("Dialog");

                if (oDialog) {
                    oDialog.open();
                    return;
                }else{
                this.loadFragment({
                    name: "zprojectodatae0404.view.fragment.CustomerDialog"
                }).then(function(oDialog) {
                    oDialog.open();
                }, this); // this는 현재컨트롤러를 바라보게
                }
            },
            onInputValue: function(oEvent){
                var oDialog = oEvent.getSource().getParent();
                var sPath = oEvent.getParameters().rowContext.sPath;
                var sKey = this.getView().getModel().getProperty(sPath+'/CustomerID');
                this.byId("a").setValue(sKey);
                oDialog.close();
                this._search(sKey);
               },
            onClose: function() {
                this.byId("Dialog").close();
            },
            _search: function (sKey) {
                var oFilter = new sap.ui.model.Filter("CustomerID", "EQ", sKey);
                this.byId("idProductsTable").getBinding("items").filter([oFilter]);
        
              },
            }
        );
    });
