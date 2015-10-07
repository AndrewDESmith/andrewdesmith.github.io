var name = "andrew.d.e.smith";
var atsign = "@";
var virtual_domain = "gmail";
var dotcom = ".com";

document.write("<div align=left>E-mail: ");

document.write("<a href=mailto:", name + atsign +
virtual_domain + dotcom, ">andrew.d.e.smith AT gmail DOT com</a>");

document.write("</div>");

document.getElementByID("contact").style="font-style:italic";

// -->
