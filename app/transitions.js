export default function(){
  this.transition(
    this.hasClass('gs-options-container'),

    // this makes our rule apply when the liquid-if transitions to the
    // true state.
    this.toValue(true),
    this.use('toUp'),

    // which means we can also apply a reverse rule for transitions to
    // the false state.
    this.reverse('toDown'),
  );

  this.transition(
    this.toRoute('index'),
    this.use('toLeft')
  );

  this.transition(
    this.toRoute('dialogs'),
    this.use('toRight')
  );
}
