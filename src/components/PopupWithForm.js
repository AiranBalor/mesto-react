function PopupWithForm({
  name,
  title,
  children,
  text,
  isOpen,
  onClose,
  onSubmit,
  isForm,
}) {
  return (
    <div className={`popup popup-${name} ${isOpen ? "popup_opened" : ""}`}>
      <form
        onSubmit={onSubmit}
        className="popup__form popup__container"
        noValidate
      >
        <h2 className="popup__container-title">{title}</h2>
        {children}
        {isForm ? (
          <button type="submit" className="popup__submit">
            {text}
          </button>
        ) : (
          ""
        )}
        <button type="button" className="popup__close" onClick={onClose} />
      </form>
    </div>
  );
}

export default PopupWithForm;
