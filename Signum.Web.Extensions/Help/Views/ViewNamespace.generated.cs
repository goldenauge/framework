﻿#pragma warning disable 1591
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.0
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Signum.Web.Help.Views
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Net;
    using System.Text;
    using System.Web;
    using System.Web.Helpers;
    using System.Web.Mvc;
    using System.Web.Mvc.Ajax;
    using System.Web.Mvc.Html;
    using System.Web.Routing;
    using System.Web.Security;
    using System.Web.UI;
    using System.Web.WebPages;
    
    #line 3 "..\..\Help\Views\ViewNamespace.cshtml"
    using Signum.Engine.Help;
    
    #line default
    #line hidden
    using Signum.Entities;
    
    #line 4 "..\..\Help\Views\ViewNamespace.cshtml"
    using Signum.Entities.Help;
    
    #line default
    #line hidden
    using Signum.Utilities;
    using Signum.Web;
    
    #line 2 "..\..\Help\Views\ViewNamespace.cshtml"
    using Signum.Web.Extensions;
    
    #line default
    #line hidden
    
    #line 1 "..\..\Help\Views\ViewNamespace.cshtml"
    using Signum.Web.Help;
    
    #line default
    #line hidden
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("RazorGenerator", "2.0.0.0")]
    [System.Web.WebPages.PageVirtualPathAttribute("~/Help/Views/ViewNamespace.cshtml")]
    public partial class ViewNamespace : System.Web.Mvc.WebViewPage<NamespaceHelp>
    {
        public ViewNamespace()
        {
        }
        public override void Execute()
        {
DefineSection("head", () => {

WriteLiteral("\r\n");

WriteLiteral("    ");

            
            #line 8 "..\..\Help\Views\ViewNamespace.cshtml"
Write(Html.ScriptCss("~/help/Content/help.css"));

            
            #line default
            #line hidden
WriteLiteral("\r\n");

});

WriteLiteral("\r\n");

            
            #line 11 "..\..\Help\Views\ViewNamespace.cshtml"
   
    NamespaceHelp nh = (NamespaceHelp)Model;

    ViewBag.Title = Model.Title + Model.Before.Try(b => " " + HelpMessage.In0.NiceToString(b));

            
            #line default
            #line hidden
WriteLiteral("\r\n\r\n\r\n\r\n<div");

WriteLiteral(" class=\"row\"");

WriteLiteral(">\r\n    <div");

WriteLiteral(" class=\"col-md-9\"");

WriteLiteral(" id=\"entityName\"");

WriteLiteral(">\r\n");

            
            #line 21 "..\..\Help\Views\ViewNamespace.cshtml"
        
            
            #line default
            #line hidden
            
            #line 21 "..\..\Help\Views\ViewNamespace.cshtml"
         using (TypeContext<NamespaceHelpDN> nc = new TypeContext<NamespaceHelpDN>(nh.Entity, null))
        {
            using (Html.BeginForm((HelpController hc) => hc.SaveNamespace(), new { id = "form-save" }))
            {
            
            
            #line default
            #line hidden
            
            #line 25 "..\..\Help\Views\ViewNamespace.cshtml"
       Write(Html.HiddenRuntimeInfo(nc));

            
            #line default
            #line hidden
            
            #line 25 "..\..\Help\Views\ViewNamespace.cshtml"
                                       
            
            
            #line default
            #line hidden
            
            #line 26 "..\..\Help\Views\ViewNamespace.cshtml"
       Write(Html.HiddenRuntimeInfo(nc, e => e.Culture));

            
            #line default
            #line hidden
            
            #line 26 "..\..\Help\Views\ViewNamespace.cshtml"
                                                       
            
            
            #line default
            #line hidden
            
            #line 27 "..\..\Help\Views\ViewNamespace.cshtml"
       Write(Html.HiddenLine(nc, e => e.Name));

            
            #line default
            #line hidden
            
            #line 27 "..\..\Help\Views\ViewNamespace.cshtml"
                                             
                if (!Navigator.IsReadOnly(typeof(NamespaceHelpDN)))
                {
                    Html.RenderPartial(HelpClient.Buttons);
                }

            
            #line default
            #line hidden
WriteLiteral("            <h1>\r\n");

WriteLiteral("                ");

            
            #line 33 "..\..\Help\Views\ViewNamespace.cshtml"
           Write(Html.TextArea(nc.SubContextPrefix(a => a.Title), nh.Title, 1, 80, new { @class = "editable" }));

            
            #line default
            #line hidden
WriteLiteral("\r\n                <span");

WriteLiteral(" class=\"wiki\"");

WriteLiteral(">\r\n");

WriteLiteral("                    ");

            
            #line 35 "..\..\Help\Views\ViewNamespace.cshtml"
               Write(Model.Title);

            
            #line default
            #line hidden
WriteLiteral("\r\n                </span>\r\n\r\n");

            
            #line 38 "..\..\Help\Views\ViewNamespace.cshtml"
                
            
            #line default
            #line hidden
            
            #line 38 "..\..\Help\Views\ViewNamespace.cshtml"
                 if (Model.Before != null)
                {

            
            #line default
            #line hidden
WriteLiteral("                    <small>");

            
            #line 40 "..\..\Help\Views\ViewNamespace.cshtml"
                      Write(HelpMessage.In0.NiceToString(Model.Before));

            
            #line default
            #line hidden
WriteLiteral("</small>\r\n");

            
            #line 41 "..\..\Help\Views\ViewNamespace.cshtml"
                }

            
            #line default
            #line hidden
WriteLiteral("            </h1>\r\n");

WriteLiteral("            <code");

WriteLiteral(" class=\"shortcut\"");

WriteLiteral(">[n:");

            
            #line 43 "..\..\Help\Views\ViewNamespace.cshtml"
                                 Write(nh.Namespace);

            
            #line default
            #line hidden
WriteLiteral("]</code>\r\n");

            
            #line 44 "..\..\Help\Views\ViewNamespace.cshtml"
            
            
            #line default
            #line hidden
            
            #line 44 "..\..\Help\Views\ViewNamespace.cshtml"
       Write(Html.TextArea(nc.SubContextPrefix(a => a.Description), nh.Description, 5, 80, new { @class = "editable" }));

            
            #line default
            #line hidden
            
            #line 44 "..\..\Help\Views\ViewNamespace.cshtml"
                                                                                                                       

            
            #line default
            #line hidden
WriteLiteral("            <span");

WriteLiteral(" class=\"wiki\"");

WriteLiteral(">\r\n");

WriteLiteral("                ");

            
            #line 46 "..\..\Help\Views\ViewNamespace.cshtml"
           Write(Html.WikiParse(nh.Description, HelpWiki.DefaultWikiSettings));

            
            #line default
            #line hidden
WriteLiteral("\r\n            </span>\r\n");

            
            #line 48 "..\..\Help\Views\ViewNamespace.cshtml"
            }
        }

            
            #line default
            #line hidden
WriteLiteral("    </div>\r\n    <div");

WriteLiteral(" class=\"col-md-3\"");

WriteLiteral(">\r\n");

            
            #line 52 "..\..\Help\Views\ViewNamespace.cshtml"
        
            
            #line default
            #line hidden
            
            #line 52 "..\..\Help\Views\ViewNamespace.cshtml"
           Html.RenderPartial(HelpClient.MiniMenu, new ViewDataDictionary { { "namespace", nh.Namespace } });
            
            #line default
            #line hidden
WriteLiteral("\r\n    </div>\r\n</div>\r\n");

        }
    }
}
#pragma warning restore 1591
