package dev.gordeev.backend.model;

import lombok.Value;

import java.time.Duration;

@Value
public class SystemUptime {
    Long days;
    Long hours;
    Long minutes;
    Long seconds;

    public SystemUptime (Duration duration) {
        days = duration.toDays();
        hours = duration.toHours();
        minutes = duration.toMinutes();
        seconds = duration.toSeconds();
    }
}
