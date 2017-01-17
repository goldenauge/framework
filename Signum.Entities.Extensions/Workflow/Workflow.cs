﻿using Signum.Entities;
using Signum.Entities.Basics;
using Signum.Utilities;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Signum.Entities.Workflow
{
    [Serializable, EntityKind(EntityKind.String, EntityData.Master)]
    public class WorkflowEntity : Entity
    {
        [NotNullable, SqlDbType(Size = 100), UniqueIndex]
        [StringLengthValidator(AllowNulls = false, Min = 3, Max = 100)]
        public string Name { get; set; }

        [NotNullable]
        [NotNullValidator]
        public TypeEntity MainEntityType { get; set; }

        /// <summary>
        /// REDUNDANT! Only for diff logging
        /// </summary>
        [InTypeScript(false)]
        public WorkflowXmlEntity FullDiagramXml { get; set; }

        static Expression<Func<WorkflowEntity, string>> ToStringExpression = @this => @this.Name;
        [ExpressionField]
        public override string ToString()
        {
            return ToStringExpression.Evaluate(this);
        }
    }
    
    [AutoInit]
    public static class WorkflowOperation
    {
        public static readonly ExecuteSymbol<WorkflowEntity> Save;
    }

    [Serializable, InTypeScript(Undefined = false)]
    public class WorkflowModel : ModelEntity
    {
        [NotNullable]
        [NotNullValidator]
        public string DiagramXml { get; set;  }

        public MList<BpmnEntityPair> Entities { get; set; } = new MList<BpmnEntityPair>();
    }

    [Serializable, InTypeScript(Undefined = false)]
    public class BpmnEntityPair : EmbeddedEntity
    {
        [NotNullable]
        [NotNullValidator]
        [ImplementedBy()]
        public ModelEntity Model { get; set; }

        [NotNullable]
        [NotNullValidator]
        public string BpmnElementId { get; set; }

        public override string ToString()
        {
            return $"{BpmnElementId} -> {Model}";
        }
    }

    public interface IWithModel
    {
        ModelEntity GetModel();
        void SetModel(ModelEntity model);
    }

    public enum WorkflowMessage
    {
        [Description("{0} belongs to a different workflow")]
        _0BelongsToADifferentWorkflow,

        [Description("Condition {0} is defined for {1} not {2}")]
        Condition0IsDefinedFor1Not2,
    }

    [Serializable]
    public class WorkflowXmlEntity : EmbeddedEntity
    {
        [NotNullable, SqlDbType(Size = int.MaxValue)]
        [StringLengthValidator(AllowNulls = false, Min = 3, Max = int.MaxValue, MultiLine = true)]
        public string DiagramXml { get; set; }
    }

    public interface IWorkflowObjectEntity : IEntity
    {
        WorkflowXmlEntity Xml { get; set; }
        string Name { get; set; }
    }

    public interface IWorkflowNodeEntity : IWorkflowObjectEntity
    {
        WorkflowLaneEntity Lane { get; set; }
    }

    public interface IWorkflowConnectionEntity : IWorkflowObjectEntity { }

    [Serializable]
    public class WorkflowReplacementModel: ModelEntity
    {
        public MList<WorkflowReplacementItemEntity> Replacements { get; set; } = new MList<WorkflowReplacementItemEntity>();
    }

    [Serializable]
    public class WorkflowReplacementItemEntity : EmbeddedEntity
    {
        [NotNullable]
        [NotNullValidator, InTypeScript(Undefined = false, Null= false)]
        public Lite<WorkflowActivityEntity> OldTask { get; set; }
        
        [NotNullValidator]
        public string NewTask { get; set; }
    }

    public class WorkflowEvaluationContext
    {
        public CaseActivityEntity CaseActivity;
        public DecisionResult? DecisionResult;
    }
}
