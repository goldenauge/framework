﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Signum.Engine.Maps;
using System.Reflection;
using Signum.Entities.Logging;
using Signum.Engine.DynamicQuery;
using Signum.Entities;
using Signum.Utilities;
using Signum.Entities.Authorization;

namespace Signum.Engine.Logging
{
    public static class ExceptionLogic
    {
        public static Func<string> GetCurrentVersion;

        public static void Start(SchemaBuilder sb, DynamicQueryManager dqm)
        {
            if (sb.NotDefined(MethodInfo.GetCurrentMethod()))
            {
                sb.Include<ExceptionDN>();

                dqm[typeof(ExceptionDN)] =
                    (from r in Database.Query<ExceptionDN>()
                     select new
                     {
                         Entity = r.ToLite(),
                         r.Id,
                         r.CreationDate,
                         r.ExceptionType,
                         ExcepcionMessage = r.ExceptionMessage,
                         r.StackTraceHash,
                     }).ToDynamic();

                DefaultEnvironment = "Default"; 
            }
        }

        public static ExceptionDN LogException(this Exception ex, Action<ExceptionDN> complete)
        {
            var prev = PreviousExceptionDN(ex);

            if (prev != null)
            {
                complete(prev);

                using (Schema.Current.GlobalMode())
                using (Transaction tr = new Transaction(true))
                {
                    prev.Save();

                    return tr.Commit(prev);
                }
            }

            var newException = new ExceptionDN(ex);
            complete(newException);
            return CompleteAndSave(newException);
        }

        public static ExceptionDN LogException(this Exception ex)
        {
           return PreviousExceptionDN(ex) ?? CompleteAndSave(new ExceptionDN(ex));
        }

        public static ExceptionDN PreviousExceptionDN(this Exception ex)
        {
            var exEntity = ex.Data[ExceptionDN.ExceptionDataKey] as ExceptionDN;

            if (exEntity != null)
                return exEntity;

            return null;
        }

        public static ExceptionDN CompleteAndSave(ExceptionDN ex)
        {
            ex.Environment = CurrentEnvironment;
            try
            {
                ex.User = UserDN.Current.ToLite(); //Session special situations
            }
            catch { }

            ex.Version = Schema.Current.MainAssembly.TryCC(a => a.GetName().Version.ToString()); 

            using (Schema.Current.GlobalMode())
            using (Transaction tr = new Transaction(true))
            {
                ex.Save();

                return tr.Commit(ex);
            }
        }

        public static string DefaultEnvironment { get; set; }

        public static string CurrentEnvironment { get { return DefaultEnvironment; } }

        static readonly Variable<string> overridenEnvironment = Statics.ThreadVariable<string>("exceptionEnviroment");

        public static IDisposable OverrideEnviroment(string newEnviroment)
        {
            string oldEnviroment = overridenEnvironment.Value;
            overridenEnvironment.Value = newEnviroment;
            return new Disposable(() => overridenEnvironment.Value = oldEnviroment);
        }
    }
}
