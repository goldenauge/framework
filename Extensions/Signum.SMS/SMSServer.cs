using Microsoft.AspNetCore.Builder;
using Signum.API;

namespace Signum.SMS;

public static class SMSServer
{
    public static void Start(IApplicationBuilder app)
    {
        SignumControllerFactory.RegisterArea(MethodInfo.GetCurrentMethod());

        SignumServer.WebEntityJsonConverterFactory.AfterDeserilization.Register((SMSTemplateEntity et) =>
        {
            if (et.Query != null)
            {
                var qd = QueryLogic.Queries.QueryDescription(et.Query.ToQueryName());
                et.ParseData(qd);
            }
        });
    }
}
