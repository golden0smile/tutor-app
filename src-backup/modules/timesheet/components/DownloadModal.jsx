import styles from "./DownloadModal.module.scss";

const DownloadModal = ({ closeModal }) => {
  return (
    <div className={styles.modal_body}>
      <div className={styles.modal_container_item}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Eget magna fermentum
        iaculis eu non diam phasellus. Non odio euismod lacinia at quis risus
        sed. Fringilla urna porttitor rhoncus dolor purus. Eleifend mi in nulla
        posuere. Feugiat sed lectus vestibulum mattis ullamcorper velit sed
        ullamcorper morbi. Arcu bibendum at varius vel pharetra vel turpis.
        Auctor urna nunc id cursus metus. Bibendum enim facilisis gravida neque
        convallis a cras semper. Est placerat in egestas erat imperdiet. Aliquet
        lectus proin nibh nisl condimentum id. Facilisi morbi tempus iaculis
        urna id volutpat. Auctor urna nunc id cursus metus aliquam. Ac turpis
        egestas sed tempus urna et. Nulla posuere sollicitudin aliquam ultrices
        sagittis orci a scelerisque. Cras adipiscing enim eu turpis egestas
        pretium aenean. Cum sociis natoque penatibus et magnis dis parturient
        montes nascetur. Non blandit massa enim nec dui nunc mattis. Neque
        aliquam vestibulum morbi blandit cursus. Eget gravida cum sociis natoque
        penatibus et magnis. Ultricies integer quis auctor elit sed vulputate mi
        sit amet. Malesuada proin libero nunc consequat interdum varius sit amet
        mattis. Lorem dolor sed viverra ipsum nunc aliquet. Pulvinar mattis nunc
        sed blandit libero volutpat sed cras ornare. Ipsum consequat nisl vel
        pretium lectus quam. Lectus urna duis convallis convallis tellus. Varius
        sit amet mattis vulputate. Nisi est sit amet facilisis magna etiam. Mi
        quis hendrerit dolor magna. Tortor pretium viverra suspendisse potenti
        nullam ac. Sapien pellentesque habitant morbi tristique. Non tellus orci
        ac auctor augue mauris augue. Urna condimentum mattis pellentesque id
        nibh tortor id aliquet lectus. Congue mauris rhoncus aenean vel elit
        scelerisque mauris. Sed arcu non odio euismod lacinia. Cras tincidunt
        lobortis feugiat vivamus at. Lectus arcu bibendum at varius vel. Integer
        vitae justo eget magna fermentum iaculis. Quis enim lobortis scelerisque
        fermentum. Egestas maecenas pharetra convallis posuere morbi leo urna.
        Elementum nisi quis eleifend quam adipiscing vitae. Consectetur purus ut
        faucibus pulvinar elementum integer enim. Et molestie ac feugiat sed
        lectus vestibulum mattis. Condimentum mattis pellentesque id nibh tortor
        id aliquet. Duis ut diam quam nulla porttitor massa id neque. Faucibus
        in ornare quam viverra orci sagittis eu volutpat odio. Eleifend mi in
        nulla posuere sollicitudin. Tellus cras adipiscing enim eu turpis
        egestas pretium. Metus aliquam eleifend mi in nulla posuere sollicitudin
        aliquam ultrices. Feugiat scelerisque varius morbi enim nunc. Urna nec
        tincidunt praesent semper. Pharetra diam sit amet nisl suscipit. Sed
        adipiscing diam donec adipiscing. Faucibus pulvinar elementum integer
        enim. Ac turpis egestas maecenas pharetra convallis posuere. Tincidunt
        ornare massa eget egestas purus viverra accumsan. Sit amet consectetur
        adipiscing elit ut aliquam purus sit. Est sit amet facilisis magna
        etiam. Est lorem ipsum dolor sit amet consectetur adipiscing elit. Eu
        volutpat odio facilisis mauris sit amet massa. Sapien pellentesque
        habitant morbi tristique senectus.
      </div>
      <div className={styles.modal_button}>
        <button
          onClick={() => {
            closeModal();
          }}
        >
          Back to Home
        </button>
        <button
          className="ms-4"
          style={{ backgroundColor: "#2f9423" }}
          onClick={() => {
            closeModal();
          }}
        >
          Download
        </button>
      </div>
    </div>
  );
};
const DownloadModalContent = ({ closeModal }) => {
  return <DownloadModal closeModal={closeModal} />;
};
export default DownloadModalContent;
