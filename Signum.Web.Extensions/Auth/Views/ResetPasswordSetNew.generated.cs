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

namespace Signum.Web.Auth.Views
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
    using Signum.Entities;
    using Signum.Entities.Authorization;
    using Signum.Utilities;
    using Signum.Web;
    using Signum.Web.Auth;
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("RazorGenerator", "2.0.0.0")]
    [System.Web.WebPages.PageVirtualPathAttribute("~/Auth/Views/ResetPasswordSetNew.cshtml")]
    public partial class ResetPasswordSetNew : System.Web.Mvc.WebViewPage<dynamic>
    {
        public ResetPasswordSetNew()
        {
        }
        public override void Execute()
        {
WriteLiteral("<script");

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral(">    $(function () { $(\"#");

            
            #line 1 "..\..\Auth\Views\ResetPasswordSetNew.cshtml"
                                                  Write(UserMapping.NewPasswordKey);

            
            #line default
            #line hidden
WriteLiteral("\").focus(); }); </script>\r\n<div");

WriteLiteral(" class=\"col-sm-offset-4\"");

WriteLiteral(">\r\n    <h2>");

            
            #line 3 "..\..\Auth\Views\ResetPasswordSetNew.cshtml"
   Write(AuthMessage.NewPassword.NiceToString());

            
            #line default
            #line hidden
WriteLiteral("</h2>\r\n    <p>");

            
            #line 4 "..\..\Auth\Views\ResetPasswordSetNew.cshtml"
  Write(AuthMessage.PleaseEnterYourChosenNewPassword.NiceToString());

            
            #line default
            #line hidden
WriteLiteral("</p>\r\n");

WriteLiteral("    ");

            
            #line 5 "..\..\Auth\Views\ResetPasswordSetNew.cshtml"
Write(Html.ValudationSummaryStatic());

            
            #line default
            #line hidden
WriteLiteral("\r\n</div>\r\n\r\n<div");

WriteLiteral(" class=\"sf-reset-password-container\"");

WriteLiteral(">\r\n\r\n");

            
            #line 10 "..\..\Auth\Views\ResetPasswordSetNew.cshtml"
    
            
            #line default
            #line hidden
            
            #line 10 "..\..\Auth\Views\ResetPasswordSetNew.cshtml"
     using (Html.BeginForm())
    {
        
            
            #line default
            #line hidden
            
            #line 12 "..\..\Auth\Views\ResetPasswordSetNew.cshtml"
   Write(Html.Hidden("rpr", ViewData["rpr"].ToString()));

            
            #line default
            #line hidden
            
            #line 12 "..\..\Auth\Views\ResetPasswordSetNew.cshtml"
                                                       

            
            #line default
            #line hidden
WriteLiteral("        <div");

WriteLiteral(" class=\"form-horizontal\"");

WriteLiteral(">\r\n            <div");

WriteLiteral(" class=\"form-group\"");

WriteLiteral(">\r\n                <label");

WriteAttribute("for", Tuple.Create(" for=\"", 553), Tuple.Create("\"", 586)
            
            #line 15 "..\..\Auth\Views\ResetPasswordSetNew.cshtml"
, Tuple.Create(Tuple.Create("", 559), Tuple.Create<System.Object, System.Int32>(UserMapping.NewPasswordKey
            
            #line default
            #line hidden
, 559), false)
);

WriteLiteral(" class=\"col-sm-offset-2 col-sm-2 control-label\"");

WriteLiteral(">");

            
            #line 15 "..\..\Auth\Views\ResetPasswordSetNew.cshtml"
                                                                                                   Write(AuthMessage.NewPassword.NiceToString());

            
            #line default
            #line hidden
WriteLiteral("</label>\r\n                <div");

WriteLiteral(" class=\"col-sm-4\"");

WriteLiteral(">\r\n");

WriteLiteral("                    ");

            
            #line 17 "..\..\Auth\Views\ResetPasswordSetNew.cshtml"
               Write(Html.Password(UserMapping.NewPasswordKey, null, new { @class = "form-control", placeholder = AuthMessage.NewPassword.NiceToString() }));

            
            #line default
            #line hidden
WriteLiteral("\r\n                </div>\r\n            </div>\r\n\r\n            <div");

WriteLiteral(" class=\"form-group\"");

WriteLiteral(">\r\n                <label");

WriteAttribute("for", Tuple.Create(" for=\"", 987), Tuple.Create("\"", 1023)
            
            #line 22 "..\..\Auth\Views\ResetPasswordSetNew.cshtml"
, Tuple.Create(Tuple.Create("", 993), Tuple.Create<System.Object, System.Int32>(UserMapping.NewPasswordBisKey
            
            #line default
            #line hidden
, 993), false)
);

WriteLiteral(" class=\"col-sm-offset-2 col-sm-2 control-label\"");

WriteLiteral(">");

            
            #line 22 "..\..\Auth\Views\ResetPasswordSetNew.cshtml"
                                                                                                      Write(AuthMessage.ConfirmNewPassword.NiceToString());

            
            #line default
            #line hidden
WriteLiteral("</label>\r\n                <div");

WriteLiteral(" class=\"col-sm-4\"");

WriteLiteral(">\r\n");

WriteLiteral("                    ");

            
            #line 24 "..\..\Auth\Views\ResetPasswordSetNew.cshtml"
               Write(Html.Password(UserMapping.NewPasswordBisKey, null, new { @class = "form-control", placeholder = AuthMessage.ConfirmNewPassword.NiceToString() }));

            
            #line default
            #line hidden
WriteLiteral("\r\n                </div>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"form-group\"");

WriteLiteral(">\r\n                <div");

WriteLiteral(" class=\"col-sm-offset-4 col-sm-6\"");

WriteLiteral(">\r\n                    <input");

WriteLiteral(" type=\"submit\"");

WriteAttribute("value", Tuple.Create(" value=\"", 1513), Tuple.Create("\"", 1563)
            
            #line 29 "..\..\Auth\Views\ResetPasswordSetNew.cshtml"
, Tuple.Create(Tuple.Create("", 1521), Tuple.Create<System.Object, System.Int32>(AuthMessage.ChangePassword.NiceToString()
            
            #line default
            #line hidden
, 1521), false)
);

WriteLiteral(" class=\"btn btn-default\"");

WriteLiteral(" />\r\n                </div>\r\n            </div>\r\n        </div>\r\n");

            
            #line 33 "..\..\Auth\Views\ResetPasswordSetNew.cshtml"
    }

            
            #line default
            #line hidden
WriteLiteral("</div>\r\n");

        }
    }
}
#pragma warning restore 1591
