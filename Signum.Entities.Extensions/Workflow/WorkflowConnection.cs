﻿using Signum.Entities;
using Signum.Entities.Basics;
using Signum.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Signum.Entities.Workflow
{

    [Serializable, EntityKind(EntityKind.Main, EntityData.Master)]
    public class WorkflowConnectionEntity : Entity, IWorkflowConnectionEntity, IWithModel
    {
        [ImplementedBy(typeof(WorkflowActivityEntity), typeof(WorkflowEventEntity), typeof(WorkflowGatewayEntity))]
        //[NotNullValidator] needs to be disabled temporally
        public IWorkflowNodeEntity From { get; set; }

        [ImplementedBy(typeof(WorkflowActivityEntity), typeof(WorkflowEventEntity), typeof(WorkflowGatewayEntity))]
        //[NotNullValidator] needs to be disabled temporally
        public IWorkflowNodeEntity To { get; set; }

        [SqlDbType(Size = 100)]
        [StringLengthValidator(AllowNulls = true, Min = 3, Max = 100)]
        public string Name { get; set; }

        public DecisionResult? DecisonResult { get; set; }

        public Lite<WorkflowConditionEntity> Condition { get; set; }

        public Lite<WorkflowActionEntity> Action { get; set; }
        
        public int Order { get; set; }

        [NotNullable]
        [NotNullValidator]
        public WorkflowXmlEntity Xml { get; set; }

        public ModelEntity GetModel()
        {
            var model = new WorkflowConnectionModel();
            model.Name = this.Name;
            model.DecisonResult = this.DecisonResult;
            model.Condition = this.Condition;
            model.Action = this.Action;
            model.Order = this.Order;
            return model;
        }

        public void SetModel(ModelEntity model)
        {
            var wModel = (WorkflowConnectionModel)model;
            this.Name = wModel.Name;
            this.DecisonResult = wModel.DecisonResult;
            this.Condition = wModel.Condition;
            this.Action = wModel.Action;
            this.Order = wModel.Order;
        }
    }

    public enum DecisionResult
    {
        Approve,
        Decline
    }

    [AutoInit]
    public static class WorkflowConnectionOperation
    {
        public static readonly ExecuteSymbol<WorkflowConnectionEntity> Save;
        public static readonly DeleteSymbol<WorkflowConnectionEntity> Delete;
    }

    [Serializable]
    public class WorkflowConnectionModel : ModelEntity
    {
        [SqlDbType(Size = 100)]
        [StringLengthValidator(AllowNulls = true, Min = 3, Max = 100)]
        public string Name { get; set; }

        public DecisionResult? DecisonResult { get; set; }

        public Lite<WorkflowConditionEntity> Condition { get; set; }

        public Lite<WorkflowActionEntity> Action { get; set; }

        public int Order { get; set; }
    }
}
