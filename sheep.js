  document.querySelectorAll('.sheep-container').forEach(container => {
    const sad = container.querySelector('.sad');
    const happy = container.querySelector('.happy');
    const sleep = container.querySelector('.sleep');

    let state = 'sad'; // 'sad' | 'happy' | 'sleep'
    let isHovered = false;
    let hoverTimer = null;
    let leaveTimer = null;

    function clearTimers() {
      clearTimeout(hoverTimer);
      clearTimeout(leaveTimer);
    }

    function startHappyToSleepTimer() {
      clearTimers();
      hoverTimer = setTimeout(() => {
        if (isHovered && state === 'happy') {
          happy.classList.remove('active');
          sleep.classList.add('active');
          state = 'sleep';
          console.log('Happy → Sleep');
        }
      }, 3000);
    }

    container.addEventListener('mouseenter', () => {
      isHovered = true;
      clearTimers();

      if (state === 'sad') {
        hoverTimer = setTimeout(() => {
          sad.classList.remove('active');
          happy.classList.add('active');
          state = 'happy';
          console.log('Sad → Happy');
          startHappyToSleepTimer(); // schedule sleep after becoming happy
        }, 3000);
      } else if (state === 'happy') {
        startHappyToSleepTimer(); // schedule sleep if re-hover on happy
      }
    });

    container.addEventListener('mouseleave', () => {
      isHovered = false;
      clearTimers();

      if (state === 'sleep') {
        console.log('Sleep stays asleep');
        return;
      }

      if (state === 'happy') {
        leaveTimer = setTimeout(() => {
          if (!isHovered && state === 'happy') {
            happy.classList.remove('active');
            sad.classList.add('active');
            state = 'sad';
            console.log('Happy → Sad after leave');
          }
        }, 3000);
      }
    });

    container.addEventListener('click', () => {
      if (state === 'sleep') {
        clearTimers();
        sleep.classList.remove('active');
        happy.classList.add('active');
        state = 'happy';
        console.log('Sleep → Happy on click');

        if (isHovered) {
          startHappyToSleepTimer(); // only start if still hovered
        }
      }
    });
  });