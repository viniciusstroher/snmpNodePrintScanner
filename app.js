var snmp = require ("net-snmp");
var session = snmp.createSession ("192.168.0.220", "public");

var oids = ["1.3.6.1.2.1.1.5.0", //nome
			 "1.3.6.1.2.1.1.6.0", //local
			 "1.3.6.1.2.1.43.10.2.1.4.1.1", // pagecount
			 "1.3.6.1.4.1.367.3.2.1.2.24.1.1.5.1", // tonner
			 "1.3.6.1.2.1.25.3.5.1.1.1 "
		   ];

session.get (oids, function (error, varbinds) {
    if (error) {
        console.error (error);
    } else {
        for (var i = 0; i < varbinds.length; i++)
            if (snmp.isVarbindError (varbinds[i]))
                console.error (snmp.varbindError (varbinds[i]))
            else
                console.log (varbinds[i].oid + " = " + varbinds[i].value);
    }
});

session.trap (snmp.TrapType.LinkDown, function (error) {
    if (error)
        console.error (error);
});