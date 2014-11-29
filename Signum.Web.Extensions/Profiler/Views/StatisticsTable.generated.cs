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

namespace Signum.Web.Profiler.Views
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
    using Signum.Utilities;
    
    #line 1 "..\..\Profiler\Views\StatisticsTable.cshtml"
    using Signum.Utilities.ExpressionTrees;
    
    #line default
    #line hidden
    using Signum.Web;
    
    #line 2 "..\..\Profiler\Views\StatisticsTable.cshtml"
    using Signum.Web.Profiler;
    
    #line default
    #line hidden
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("RazorGenerator", "2.0.0.0")]
    [System.Web.WebPages.PageVirtualPathAttribute("~/Profiler/Views/StatisticsTable.cshtml")]
    public partial class StatisticsTable : System.Web.Mvc.WebViewPage<IOrderedEnumerable<SqlProfileResume>>
    {
        public StatisticsTable()
        {
        }
        public override void Execute()
        {
            
            #line 4 "..\..\Profiler\Views\StatisticsTable.cshtml"
             
    SqlProfileResumeOrder order = ViewBag.Order;

            
            #line default
            #line hidden
WriteLiteral("\r\n<table");

WriteLiteral(" class=\"table sf-stats-table\"");

WriteLiteral(">\r\n    <thead>\r\n        <tr>\r\n            <th>\r\n                Query\r\n          " +
"  </th>\r\n            <th");

WriteAttribute("class", Tuple.Create(" class=\"", 322), Tuple.Create("\"", 396)
            
            #line 13 "..\..\Profiler\Views\StatisticsTable.cshtml"
, Tuple.Create(Tuple.Create("", 330), Tuple.Create<System.Object, System.Int32>(order == SqlProfileResumeOrder.Count ? "sf-header-sort-up" : ""
            
            #line default
            #line hidden
, 330), false)
);

WriteLiteral(">\r\n");

WriteLiteral("                ");

            
            #line 14 "..\..\Profiler\Views\StatisticsTable.cshtml"
           Write(Html.ActionLink("Count", (ProfilerController pc) => pc.Statistics(SqlProfileResumeOrder.Count)));

            
            #line default
            #line hidden
WriteLiteral("\r\n            </th>\r\n            <th");

WriteAttribute("class", Tuple.Create(" class=\"", 548), Tuple.Create("\"", 620)
            
            #line 16 "..\..\Profiler\Views\StatisticsTable.cshtml"
, Tuple.Create(Tuple.Create("", 556), Tuple.Create<System.Object, System.Int32>(order == SqlProfileResumeOrder.Sum ? "sf-header-sort-up" : ""
            
            #line default
            #line hidden
, 556), false)
);

WriteLiteral(">\r\n");

WriteLiteral("                ");

            
            #line 17 "..\..\Profiler\Views\StatisticsTable.cshtml"
           Write(Html.ActionLink("Sum", (ProfilerController pc) => pc.Statistics(SqlProfileResumeOrder.Sum)));

            
            #line default
            #line hidden
WriteLiteral("\r\n            </th>\r\n            <th");

WriteAttribute("class", Tuple.Create(" class=\"", 768), Tuple.Create("\"", 840)
            
            #line 19 "..\..\Profiler\Views\StatisticsTable.cshtml"
, Tuple.Create(Tuple.Create("", 776), Tuple.Create<System.Object, System.Int32>(order == SqlProfileResumeOrder.Avg ? "sf-header-sort-up" : ""
            
            #line default
            #line hidden
, 776), false)
);

WriteLiteral(">\r\n");

WriteLiteral("                ");

            
            #line 20 "..\..\Profiler\Views\StatisticsTable.cshtml"
           Write(Html.ActionLink("Avg", (ProfilerController pc) => pc.Statistics(SqlProfileResumeOrder.Avg)));

            
            #line default
            #line hidden
WriteLiteral("\r\n            </th>\r\n            <th");

WriteAttribute("class", Tuple.Create(" class=\"", 988), Tuple.Create("\"", 1060)
            
            #line 22 "..\..\Profiler\Views\StatisticsTable.cshtml"
, Tuple.Create(Tuple.Create("", 996), Tuple.Create<System.Object, System.Int32>(order == SqlProfileResumeOrder.Min ? "sf-header-sort-up" : ""
            
            #line default
            #line hidden
, 996), false)
);

WriteLiteral(">\r\n");

WriteLiteral("                ");

            
            #line 23 "..\..\Profiler\Views\StatisticsTable.cshtml"
           Write(Html.ActionLink("Min", (ProfilerController pc) => pc.Statistics(SqlProfileResumeOrder.Min)));

            
            #line default
            #line hidden
WriteLiteral("\r\n            </th>\r\n            <th");

WriteAttribute("class", Tuple.Create(" class=\"", 1208), Tuple.Create("\"", 1280)
            
            #line 25 "..\..\Profiler\Views\StatisticsTable.cshtml"
, Tuple.Create(Tuple.Create("", 1216), Tuple.Create<System.Object, System.Int32>(order == SqlProfileResumeOrder.Max ? "sf-header-sort-up" : ""
            
            #line default
            #line hidden
, 1216), false)
);

WriteLiteral(">\r\n");

WriteLiteral("                ");

            
            #line 26 "..\..\Profiler\Views\StatisticsTable.cshtml"
           Write(Html.ActionLink("Max", (ProfilerController pc) => pc.Statistics(SqlProfileResumeOrder.Max)));

            
            #line default
            #line hidden
WriteLiteral("\r\n            </th>\r\n            <th>\r\n               References\r\n            </t" +
"h>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n");

            
            #line 34 "..\..\Profiler\Views\StatisticsTable.cshtml"
        
            
            #line default
            #line hidden
            
            #line 34 "..\..\Profiler\Views\StatisticsTable.cshtml"
         foreach (var item in Model)
        {

            
            #line default
            #line hidden
WriteLiteral("            <tr>\r\n                <td><a");

WriteLiteral(" class=\"sf-stats-show\"");

WriteLiteral(" href=\"javascript:void(0)\"");

WriteLiteral(">Show</a></td>\r\n                <td>");

            
            #line 38 "..\..\Profiler\Views\StatisticsTable.cshtml"
               Write(item.Count);

            
            #line default
            #line hidden
WriteLiteral("</td>\r\n                <td>");

            
            #line 39 "..\..\Profiler\Views\StatisticsTable.cshtml"
               Write(item.Sum.NiceToString());

            
            #line default
            #line hidden
WriteLiteral("</td>\r\n                <td>");

            
            #line 40 "..\..\Profiler\Views\StatisticsTable.cshtml"
               Write(item.Avg.NiceToString());

            
            #line default
            #line hidden
WriteLiteral("</td>\r\n                <td>");

            
            #line 41 "..\..\Profiler\Views\StatisticsTable.cshtml"
               Write(item.Min.NiceToString());

            
            #line default
            #line hidden
WriteLiteral("</td>\r\n                <td>");

            
            #line 42 "..\..\Profiler\Views\StatisticsTable.cshtml"
               Write(item.Max.NiceToString());

            
            #line default
            #line hidden
WriteLiteral("</td>\r\n                <td>\r\n");

            
            #line 44 "..\..\Profiler\Views\StatisticsTable.cshtml"
                   
            
            #line default
            #line hidden
            
            #line 44 "..\..\Profiler\Views\StatisticsTable.cshtml"
                    foreach (var r in item.References.Iterate())
                   {
                       
            
            #line default
            #line hidden
            
            #line 46 "..\..\Profiler\Views\StatisticsTable.cshtml"
                  Write(Html.ActionLink(r.Value.FullKey + " " + r.Value.ElapsedToString, (ProfilerController pc) => pc.HeavyRoute(r.Value.FullKey)));

            
            #line default
            #line hidden
            
            #line 46 "..\..\Profiler\Views\StatisticsTable.cshtml"
                                                                                                                                                   
                       if (!r.IsLast)
                       {

            
            #line default
            #line hidden
WriteLiteral("                           ");

WriteLiteral("|");

WriteLiteral(" \r\n");

            
            #line 50 "..\..\Profiler\Views\StatisticsTable.cshtml"
                       }
                   }

            
            #line default
            #line hidden
WriteLiteral("                </td>  \r\n            </tr>\r\n");

WriteLiteral("            <tr");

WriteLiteral(" style=\"display:none\"");

WriteLiteral(">\r\n            <td");

WriteLiteral(" colspan=\"7\"");

WriteLiteral(">\r\n            <pre");

WriteLiteral(" style=\"width:1500px\"");

WriteLiteral(" >");

            
            #line 56 "..\..\Profiler\Views\StatisticsTable.cshtml"
                                  Write(item.Query);

            
            #line default
            #line hidden
WriteLiteral("</pre>\r\n            </td>\r\n            </tr>\r\n");

            
            #line 59 "..\..\Profiler\Views\StatisticsTable.cshtml"
        }

            
            #line default
            #line hidden
WriteLiteral("        \r\n    </tbody>\r\n</table>");

        }
    }
}
#pragma warning restore 1591
