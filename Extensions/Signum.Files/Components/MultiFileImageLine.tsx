import * as React from 'react'
import { classes } from '@framework/Globals'
import * as Constructor from '@framework/Constructor'
import { TypeContext } from '@framework/TypeContext'
import { Type, getSymbol } from '@framework/Reflection'
import { FormGroup } from '@framework/Lines/FormGroup'
import { ModifiableEntity, Lite, Entity, MList, SearchMessage, EmbeddedEntity, EntityControlMessage, getToString } from '@framework/Signum.Entities'
import { IFile, FileTypeSymbol } from '../Signum.Files'
import { FileDownloader, FileDownloaderConfiguration, DownloadBehaviour } from './FileDownloader'
import { FileUploader } from './FileUploader'
import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Files.css"
import { EntityListBaseController, EntityListBaseProps } from '@framework/Lines/EntityListBase'
import { FetchAndRemember } from '@framework/Lines'
import { FileImage } from './FileImage';
import { genericForwardRef, useController } from '@framework/Lines/LineBase'
import { ImageModal } from './ImageModal'
import { Aprox, AsEntity } from '@framework/Lines/EntityBase'

export { FileTypeSymbol };

interface MultiFileImageLineProps<V extends ModifiableEntity/* & IFile*/ | Lite</*IFile & */Entity>> extends EntityListBaseProps<V> {
  download?: DownloadBehaviour;
  dragAndDrop?: boolean;
  dragAndDropMessage?: string;
  fileType?: FileTypeSymbol;
  accept?: string;
  configuration?: FileDownloaderConfiguration<IFile>;
  imageHtmlAttributes?: React.ImgHTMLAttributes<HTMLImageElement>;
  maxSizeInBytes?: number;
  getFile?: (ectx: V) => ModifiableEntity & IFile | Lite<IFile & Entity>;
  createEmbedded?: (file: ModifiableEntity & IFile | Lite<IFile & Entity>) => Promise<V>;
}

export class MultiFileImageLineController<V extends ModifiableEntity /*& IFile*/ | Lite</*IFile & */Entity>> extends EntityListBaseController<MultiFileImageLineProps<V>, V> {

  overrideProps(p: MultiFileImageLineProps<V>, overridenProps: MultiFileImageLineProps<V>) {
    super.overrideProps(p, overridenProps);

    let pr = p.ctx.propertyRoute;
    if (pr && p.getFile)
      pr = pr.addMember("Indexer", "", true).addLambda(p.getFile);

    const m = pr?.member;
    if (m?.defaultFileTypeInfo) {

      if (p.fileType == null)
        p.fileType = getSymbol(FileTypeSymbol, m.defaultFileTypeInfo.key)


      if (p.accept == null && m.defaultFileTypeInfo.onlyImages)
        p.accept = "image/*";

      if (p.maxSizeInBytes == null && m.defaultFileTypeInfo.maxSizeInBytes)
        p.maxSizeInBytes = m.defaultFileTypeInfo.maxSizeInBytes;
    }
  }

  handleDeleteValue = (index: number) => {
    const list = this.props.ctx.value;
    list.removeAt(index);
    this.setValue(list);
  }

  handleFileLoaded = (file: IFile & ModifiableEntity) => {
    if (this.props.createEmbedded)
      this.props.createEmbedded(file)
        .then(em => em && this.addElement(em));
    else
      this.convert(file as unknown as Aprox<V>)
        .then(f => this.addElement(f));
  }
}

export const MultiFileImageLine = genericForwardRef(function MultiFileLine<V extends ModifiableEntity /*& IFile*/ | Lite</*IFile &*/ Entity>>(props: MultiFileImageLineProps<V>, ref: React.Ref<MultiFileImageLineController<V>>) {

  const c = useController(MultiFileImageLineController<V>, props, ref);
  const p = c.props;

  if (c.isHidden)
    return null;

  return (
    <FormGroup ctx={p.ctx} label={p.label} labelIcon={p.labelIcon}
      htmlAttributes={{ ...c.baseHtmlAttributes(), ...p.formGroupHtmlAttributes }}
      helpText={p.helpText}
      labelHtmlAttributes={p.labelHtmlAttributes}>
      {() => <div>
        <div className="d-flex">
          {
            c.getMListItemContext(p.ctx.subCtx({ formGroupStyle: "None" })).map(mlec =>
              <div className="sf-file-image-container m-2" key={mlec.index}>
                {p.getComponent ? p.getComponent(mlec as TypeContext<AsEntity<V>>) :
                  p.download == "None" ? <span className={classes(mlec.formControlClass, "file-control")} > {getToString(mlec.value)}</span > :
                    renderFile(p.getFile ? mlec.subCtx(p.getFile) : mlec as unknown as TypeContext<ModifiableEntity & IFile | Lite<IFile & Entity>>)}
                {!p.ctx.readOnly &&
                  <a href="#" title={EntityControlMessage.Remove.niceToString()}
                    className="sf-line-button sf-remove"
                    onClick={e => { e.preventDefault(); c.handleDeleteValue(mlec.index!); }}>
                    <FontAwesomeIcon icon="xmark" />
                  </a>}
              </div>
            )
          }
        </div>
        <div>
          {p.ctx.readOnly ? undefined :
            <FileUploader
              accept={p.accept || "image/*"}
              multiple={true}
              maxSizeInBytes={p.maxSizeInBytes}
              dragAndDrop={p.dragAndDrop}
              dragAndDropMessage={p.dragAndDropMessage}
              fileType={p.fileType}
              onFileLoaded={c.handleFileLoaded}
              typeName={p.getFile ?
                p.ctx.propertyRoute!.addMember("Indexer", "", true).addLambda(p.getFile).typeReference().name! :
                p.ctx.propertyRoute!.typeReference().name}
              buttonCss={p.ctx.buttonClass}
              divHtmlAttributes={{ className: "sf-file-line-new" }} />}
        </div>
      </div>}
    </FormGroup>
  );


  function renderFile(ctx: TypeContext<ModifiableEntity & IFile | Lite<IFile & Entity>>) {
    const val = ctx.value!;

    return ctx.propertyRoute!.typeReference().isLite ?
      <FetchAndRemember lite={val! as Lite<IFile & Entity>}>{file => <FileImage file={file} {...p.imageHtmlAttributes} style={{ maxWidth: "100px" }} />}</FetchAndRemember> :
      <FileImage file={val as IFile & ModifiableEntity} {...p.imageHtmlAttributes} style={{ maxWidth: "100px" }} onClick={e => ImageModal.show(val as IFile & ModifiableEntity, e)} />;
  }
});

(MultiFileImageLine as any).defaultProps = {
  download: "SaveAs",
  dragAndDrop: true
} as MultiFileImageLineProps<any>;



