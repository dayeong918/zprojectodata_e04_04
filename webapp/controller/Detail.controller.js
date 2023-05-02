sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("zprojectodatae0404.controller.Detail", {
            onInit: function () {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("RouteDetail").attachPatternMatched(this._onPatternMatched, this); // 패턴이 맞으면 onPatternmatched를 실행해라(_는 함수안에서만 사용하는거라고 암묵적인룰)
            },
            _onPatternMatched: function(oEvent){
                //oEvent.getParametrs().arguments
                var oArgu = oEvent.getParameter("arguments");
                var oModel = this.getView().getModel(); // Northwind Odata Model
                var oFilter = new sap.ui.model.Filter('OrderID', 'EQ', oArgu.key);
                console.log(oArgu); //{ key : 10248 }

                oModel.read("/Orders", {
                    filters: [oFilter],
                    success: function(oReturn){
                        console.log(oReturn.results[0]);
                    }
                });
            }
        });
    });