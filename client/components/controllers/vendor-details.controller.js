app.controller('vendorDetailsController', function($scope, $location){
  
    $scope.vendor = {
        name: "Grainger",
        contractNo: "TS001",
        pointOfContact: "Greg Roberts",
        address: "123 North Something Drive\nColorado Springs, Colorado, 80918",
        phoneNumber: "719-555-9876",
        email: "contact@grainger.com",
        image: "grainger.png",
        website: "www.grainger.com",

        contractNumber: "TS0012",
        contractStart: "10/14/2012",
        contractEnd: "1/17/2017"
    }

    $scope.transactions = [
        {
            vendor: "Grainger",
            invoiceDate: "7/8/2017",
            datePaid: "10/7/2017",
            invoiceNum: "1212ASD12ASD478",
            description: "Still a short one",
            expensed: 9358
        },
        {
            vendor: "Grainger",
            invoiceDate: "9/10/2017",
            datePaid: "10/2/2017",
            invoiceNum: "12A34B56C43HD",
            description: "This is alonger description. A lot of detail was need to descrbe this transaction, let me tell you",
            expensed: 56983.32
        },
        {
            vendor: "Granger",
            invoiceDate: "9/8/2017",
            datePaid: "10/2/2017",
            invoiceNum: "12A34B56C",
            description: "",
            expensed: 100
        },
        {
            vendor: "Grainger",
            invoiceDate: "7/8/2017",
            datePaid: "10/7/2017",
            invoiceNum: "1212ASD12ASD478",
            description: "Still a short one",
            expensed: 9358
        },
        {
            vendor: "Granger",
            invoiceDate: "9/8/2017",
            datePaid: "10/2/2017",
            invoiceNum: "12A34B56C",
            description: "",
            expensed: 100
        },
        {
            vendor: "Grainger",
            invoiceDate: "9/10/2017",
            datePaid: "10/2/2017",
            invoiceNum: "12A34B56C43HD",
            description: "This is alonger description. A lot of detail was need to descrbe this transaction, let me tell you",
            expensed: 56983.32
        },
        {
            vendor: "Grainger",
            invoiceDate: "9/10/2017",
            datePaid: "10/2/2017",
            invoiceNum: "12A34B56C43HD",
            description: "This is alonger description. A lot of detail was need to descrbe this transaction, let me tell you",
            expensed: 56983.32
        },
        {
            vendor: "Granger",
            invoiceDate: "9/8/2017",
            datePaid: "10/2/2017",
            invoiceNum: "12A34B56C",
            description: "",
            expensed: 100
        },
        {
            vendor: "Grainger",
            invoiceDate: "7/8/2017",
            datePaid: "10/7/2017",
            invoiceNum: "1212ASD12ASD478",
            description: "Still a short one",
            expensed: 9358
        },
        {
            vendor: "Granger",
            invoiceDate: "9/8/2017",
            datePaid: "10/2/2017",
            invoiceNum: "12A34B56C",
            description: "",
            expensed: 100
        },
        {
            vendor: "Grainger",
            invoiceDate: "9/10/2017",
            datePaid: "10/2/2017",
            invoiceNum: "12A34B56C43HD",
            description: "This is alonger description. A lot of detail was need to descrbe this transaction, let me tell you",
            expensed: 56983.32
        }
    ]
});