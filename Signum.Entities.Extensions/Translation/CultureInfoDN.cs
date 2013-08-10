﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Linq.Expressions;
using System.Globalization;
using Signum.Utilities;
using System.Reflection;

namespace Signum.Entities.Translation
{
    [Serializable, EntityKind(EntityKind.String, EntityData.Master)]
    public class CultureInfoDN : Entity
    {
        public CultureInfoDN() { }

        public CultureInfoDN(CultureInfo ci)
        {
            Name = ci.Name;
            NativeName = ci.NativeName;
            EnglishName = ci.EnglishName;
        }

        [NotNullable, SqlDbType(Size = 10), UniqueIndex]
        string name;
        [StringLengthValidator(AllowNulls = false, Min = 2, Max = 10)]
        public string Name
        {
            get { return name; }
            set { SetToStr(ref name, value, () => Name); }
        }

        string nativeName;
        public string NativeName
        {
            get { return nativeName; }
            private set { Set(ref nativeName, value, () => NativeName); }
        }

        string englishName;
        public string EnglishName
        {
            get { return englishName; }
            private set { Set(ref englishName, value, () => EnglishName); }
        }

        public CultureInfo CultureInfo
        {
            get
            {
                return CultureInfo.GetCultureInfo(Name);
            }
        }

        protected override string PropertyValidation(PropertyInfo pi)
        {
            if (pi.Is(() => Name) && Name.HasText())
            {
                try
                {
                    CultureInfo culture = CultureInfo;
                }
                catch (CultureNotFoundException)
                {
                    return "'{0}' is not a valid culture name".Formato(Name);
                }
            }

            return base.PropertyValidation(pi);
        }

        protected override void PreSaving(ref bool graphModified)
        {
            try
            {
                EnglishName = CultureInfo.EnglishName;
                NativeName = CultureInfo.NativeName;
            }
            catch (CultureNotFoundException)
            {
            }

            base.PreSaving(ref graphModified);
        }

        static Expression<Func<CultureInfoDN, string>> ToStringExpression = e => e.EnglishName;
        public override string ToString()
        {
            return ToStringExpression.Evaluate(this);
        }
    }

    public enum CultureInfoOperation
    {
        Save
    }

    public enum TranslationPermission
    {
        TranslateCode,
        TranslateInstances
    }
}
