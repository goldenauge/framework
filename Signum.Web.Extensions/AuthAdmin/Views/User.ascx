<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<%@ Import Namespace="Signum.Web" %>
<%@ Import Namespace="Signum.Engine" %>
<%@ Import Namespace="Signum.Entities" %>
<%@ Import Namespace="Signum.Utilities" %>
<%@ Import Namespace="Signum.Entities.Authorization" %>
<%@ Import Namespace="Signum.Web.Authorization" %>
<%@ Import Namespace="Signum.Web.Extensions.Properties" %>

<%
using (var e = Html.TypeContext<UserDN>()) 
{
    Html.ValueLine(e, f => f.UserName, vl => vl.ValueHtmlProps["size"] = 50);
    if (e.Value.IsNew || (ViewData["NewPwd"] != null && bool.Parse(ViewData["NewPwd"].ToString())))
    { 
        %>
        <label class="labelLine"><%= Resources.ChangePasswordAspx_NewPassword %></label>
        <%= Html.Password(UserMapping.NewPasswordKey, "", new Dictionary<string, string>{{"class","valueLine"}})%>
        <%= Html.ValidationMessage(UserMapping.NewPasswordKey)%>
        <div class="clearall"></div>
        
        <label class="labelLine"><%= Resources.ChangePasswordAspx_ConfirmNewPassword %></label>
        <%= Html.Password(UserMapping.NewPasswordBisKey, "", new Dictionary<string, string>{{"class","valueLine"}})%>
        <%= Html.ValidationMessage(UserMapping.NewPasswordBisKey)%>
        <%
    }
    
    Html.ValueLine(e, f => f.Email, vl=>vl.ValueHtmlProps["size"]=30);
    Html.EntityLine(e, f => f.Role);
    Html.ValueLine(e, f => f.State);
    Html.EntityLine(e, f => f.Related);
}
%>
