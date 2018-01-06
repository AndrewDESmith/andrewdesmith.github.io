var name = "andrewdesmith";
var atsign = "@";
var virtual_domain = "protonmail";
var dotcom = ".com";

document.write("<div align=left>E-mail: ");

document.write("<a href=mailto:", name + atsign +
virtual_domain + dotcom, ">andrewdesmith AT protonmail DOT com</a>");

document.write("</div>");

document.getElementByID("contact").style="font-style:italic";
