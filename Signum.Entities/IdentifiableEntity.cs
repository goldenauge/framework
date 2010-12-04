﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Signum.Utilities;
using System.Runtime.Serialization;
using System.Reflection;
using System.Collections.Specialized;
using Signum.Entities.Properties;
using Signum.Utilities.DataStructures;
using Signum.Entities.Reflection;
using System.ComponentModel;
using System.Linq.Expressions;
using Signum.Utilities.Reflection;
using Signum.Utilities.ExpressionTrees;

namespace Signum.Entities
{
    [Serializable]
    public abstract class IdentifiableEntity : ModifiableEntity, IIdentifiable
    {
        internal int? id = null; //primary key
        protected internal string toStr; //no value for new entities

        [HiddenProperty, Description("Id")]
        public int Id
        {
            get
            {
                if (id == null)
                    throw new InvalidOperationException("{0} is new and has no Id".Formato(this.GetType().Name));
                return id.Value;
            }
            internal set { id = value; }
        }

        [HiddenProperty]
        [Description("Id")]
        public int? IdOrNull
        {
            get { return id; }
        }

        [HiddenProperty]
        public string ToStr
        {
            get { return toStr; }
            //protected set { Set(ref toStr, value, () => ToStr); }
               protected set { toStr= value; }// TODO: olmo revisar
        }

        [Ignore]
        bool isNew = true;
        [HiddenProperty]
        public bool IsNew
        {
            get { return isNew; }
            internal set { isNew = value; }
        }

        protected bool SetIfNew<T>(ref T field, T value, Expression<Func<T>> property)
        {
            if (EqualityComparer<T>.Default.Equals(field, value))
                return false;

            if (!IsNew)
            {
                PropertyInfo pi = ReflectionTools.BasePropertyInfo(property);
                throw new InvalidOperationException("Attempt to modify '{0}' when the entity is not new".Formato(pi.Name));
            }

            return base.Set<T>(ref field, value, property);
        }

        protected internal override void PreSaving(ref bool graphModified)
        {
            base.PreSaving(ref graphModified);

            ToStr = ToString();
        }

        public override string ToString()
        {
            return BaseToString();
        }

        internal string BaseToString()
        {
            return "{0} ({1})".Formato(GetType().Name, id.HasValue ? id.ToString() : Resources.New);
        }

        public override bool Equals(object obj)
        {
            if(obj == this)
                return true;

            if(obj == null)
                return false;

            IdentifiableEntity ident = obj as IdentifiableEntity;
            if (ident != null && ident.GetType() == this.GetType() && this.id != null && this.id == ident.id)
                return true;

            return false;
        }

        public virtual string IdentifiableIntegrityCheck()
        {
            return GraphExplorer.IdentifiableIntegrityCheck(GraphExplorer.FromRootIdentifiable(this));
        }

        public override int GetHashCode()
        {
            return id == null ?
                base.GetHashCode() :
                GetType().FullName.GetHashCode() ^ id.Value;
        }

        /// <summary>
        /// Sql-nullify an constant expression in order to work on polymorphic member accesses on Linq queries.
        /// </summary>
        [MethodExpander(typeof(ShyExpander))]
        public T Shy<T>(T value)
        {
            return value;
        }

        class ShyExpander : IMethodExpander
        {
            public Expression Expand(Expression instance, Expression[] arguments, Type[] typeArguments)
            {
                Type t = typeArguments[0];

                Expression ce =  Expression.Constant(null, t.Nullify());

                return Expression.Condition(Expression.NotEqual(instance, Expression.Constant(null, instance.Type)), arguments[0].Nullify(), ce);
            }
        }

    }

    public interface IIdentifiable : INotifyPropertyChanged, IDataErrorInfo, ICloneable
    {
        int Id { get; }
        int? IdOrNull { get; }
        string ToStr { get; }
        bool IsNew { get; }
    }
}
